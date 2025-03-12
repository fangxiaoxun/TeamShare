const { select, insert, update } = require('../lib/db')
const db = require('../lib/db')

const EmailService = require('../lib/email/emailService')

const crypto = require('crypto')
// const getLatest = async (ownerId) => {
//     return await select('*').where('owner_id', ownerId).orderBy('updated_at', 'desc')
// }


const checkPermission = async (fileId, userId, requiredRole) => {
    try {

        console.log(fileId, userId, 'fileId userId')
        const file = await db.table('files').select('*').where('id', fileId).andWhere('deleteType', 0);
        console.log(file, 'file'); // 检查是否存在 space_id

        const role = await db.table('space_members')
            .where('space_id', file[0].space_id)
            .andWhere('user_id', userId)
            .select('role');
        console.log(role);



        const [permission] = await db.table('files')
            .join('space_members', 'files.space_id', 'space_members.space_id')
            .where({
                'files.id': fileId,
                'space_members.user_id': userId,
                'files.deleteType': 0
            }).select('space_members.role')

        console.log(permission, 'permission')
        if (!permission || !requiredRole.includes(permission.role)) {
            return false
        }
        return true
    } catch (error) {
        console.log('文件权限查询失败：', error)
    }
}

exports.getLatest = async (owner_id) => {
    try {

        const files = await db.table('files')
            .join('users', 'files.owner_id ', ' users.userId')
            .select(['files.*', 'users.userName'])
            .where({
                'owner_id': owner_id,
                'userId': owner_id,
                'deleteType': '0'
            })
            .orderBy('updated_at', 'desc');

        if (!files || !files.length === 0) return []
        const fileIds = files.map(f => f.id)
        const collectionStatus = await db.table('file_collections').whereIn('file_id', fileIds)
            .andWhere('user_id', owner_id)
            .groupBy('file_id')
            .then(results => {
                return results.reduce((map, item) => {
                    map[item.file_id] = true; // 存在即表示已收藏
                    return map;
                }, {});

            })
        return files.map(file => ({
            ...file,
            is_collected: collectionStatus[file.id] || false,
            userName: file.userName
        }))


    } catch (error) {
        console.error('获取最近文件列表失败：', error)
        return []
    }
}

exports.getFile = async (space_id) => {
    try {
        const res = await db.table('files')
            .where({ space_id, deleteType: 0 })
        return res
    } catch (error) {
        console.error('获取空间文件列表失败：', error)
        return []
    }
}

exports.addFile = async (fileOption) => {
    try {
        const [fileId] = await db.table('files').insert(fileOption)
        return { fileId }
    } catch (error) {
        console.error('新建文件失败：', error)

    }
}

exports.updateFile = async (userId, fileId, name, content) => {

    try {
        const isHasPermission = await checkPermission(fileId, userId, ['owner', 'editor'])
        if (!isHasPermission) throw new Error('没有权限')

        await db.table('files')
            .where({ id: fileId })
            .update({
                name,
                content
            })

    } catch (error) {
        console.error('更新文件失败：', error)
        throw error
    }
}

exports.delFile = async (fileId, userId) => {
    try {
        console.log('执行删除')
        const isHasPermission = await checkPermission(fileId, userId, ['owner', 'editor'])
        console.log(isHasPermission)
        if (!isHasPermission) throw new Error('没有删除权限')

        const res = await db.table('files')
            .where({ id: fileId })
            .update({
                deleteType: 1,
                delete_at: new Date()
            })
        console.log(res)

    } catch (error) {
        console.error('删除文件失败:', error)
        throw error
    }
}

// 根据 spaceId 获取文件列表
exports.getFileListBySpaceId = async (spaceId) => {
    const fileList = await db.table('files')
        .select('files.*', 'users.userName')
        .join('users', 'files.owner_id', 'users.userId')
        .where('files.space_id', spaceId)
        .andWhere('files.deleteType', 0)
    return fileList

}

exports.addFileCollection = async (userId, fileId) => {
    try {
        // 结合查询 userName
        const res = db.table('file_collections')
            .insert({
                user_id: userId,
                file_id: fileId
            }).returning('*')
        return res
    } catch (error) {
        console.error('收藏文件失败：', error)
        // throw error
    }
}

exports.cancelCollectFile = async (userId, fileId) => {
    try {
        const res = db.table('file_collections')
            .where('user_id', userId)
            .andWhere('file_id', fileId)
            .delete()
        return res
    } catch (error) {
        console.error('取消收藏失败：', error)

    }
}

exports.getCollectFile = async (userId) => {
    try {
        const res = db.table('file_collections')
            .select('files.*', 'users.userName')
            .join('files', 'files.id = file_collections.file_id')
            .where('file_collections.user_id', userId)
            .andWhere('files.deleteType', 0)
        return res

    } catch (error) {
        console.error('获取收藏列表失败：', error)
    }
}

// 获取回收站文件列表
exports.getTrashList = async (userId) => {
    try {
        const res = db.table('files')
            .select('*')
            .where('owner_id', userId)
            .andWhere('deleteType', 1)
        return res
    } catch (error) {
        console.log('获取回收站文件失败：', error)

    }
}

exports.recoverFile = async (fileId) => {
    try {
        const res = await db.table('files')
            .update({
                deleteType: 0,
                delete_at: null
            })
            .where({ id: fileId })
    } catch (error) {
        console.error('恢复文件失败：', error)
    }
}

exports.inviteCollaborator = async (fileId, collaboratorEmail, userId) => {
    try {
        const file = await db.table('files').where({ id: fileId }).first()
        if (!file) return null
        // process.env.BASE_URL 可能出问题
        const inviteToken = crypto.randomBytes(32).toString('hex')
        const inviteLink = `localhost:5173/invite/${fileId}?token=${inviteToken}`

        //todo: 权限修改逻辑需要调整
        await db.table('invitations').insert({
            file_id: fileId,
            invitee_id: userId,
            invitee_email: collaboratorEmail,
            token: inviteToken,
            status: 'pending',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60)
        })

        const emailService = new EmailService()


        const mailOptions = {
            from: '1272449367@qq.com', // 发件人
            to: collaboratorEmail, // 收件人（必填！）
            subject: `Hi ${collaboratorEmail}:`,
            html: `<p>点击链接接受邀请${inviteLink}</p>`,
        };
        const data = await emailService.send(mailOptions)

        console.log(data, 'data')
        return {
            file,
            inviteLink
        }


    } catch (error) {
        console.error('查询文件失败', error)
    }
}