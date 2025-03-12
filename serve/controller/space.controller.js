const { select, insert, update, table } = require('../lib/db')

// 创建空间
exports.createSpace = async (ownerId, name, description) => {
    try {
        const existingSpace = await select('id')
            .from('spaces')
            .where('owner_id', ownerId)
            .andWhere('name', name)
        // console.log(existingSpace)
        if (existingSpace.length !== 0) {
            console.log(existingSpace)
            throw new Error('空间名称已存在')
        }
        const [result] = await table('spaces').insert({
            name,
            description,
            owner_id: ownerId
        })
        // console.log(result, 'result')
        const spaceId = result
        console.log(spaceId, 'spaceId')
    

        await table('space_members').insert({
            space_id: spaceId,
            user_id: ownerId,
            role: 'owner'
        })


        return spaceId
    } catch (error) {
        console.log('创建空间失败', error)
        throw error
    }
}

// 查询所有空间列表
exports.getSpacesList = async (userId) => {

    console.log(userId)
    try {
        const spaces = await select([
            'spaces.*',
            'space_members.role AS member_role' // 如果需要显示成员角色
        ])
            .from('spaces')
            .leftJoin('space_members', 'spaces.id', 'space_members.space_id')
            .where('spaces.owner_id', userId) // 自有空间
            .orWhere('space_members.user_id', userId) // 协作空间
            // .groupBy('spaces.id') // 去重
            .select([
                'spaces.id',
                'spaces.name',
                'spaces.description',
                'spaces.created_at',
                'spaces.updated_at'
            ])

        // 区分自有和协作空间
        return spaces.map(space => ({
            ...space,
            is_owner: space.owner_id === userId,
            member_role: space.member_role || null
        }))
    } catch (error) {
        console.error('获取用户空间失败', error)
        throw error
    }
}


exports.updateSpace = async (userId, spaceId, name, description) => {
    try {
        // 验证是否具有修改权限
        const [space] = await select('owner_id').from('spaces').where('id', spaceId)
        if(space.owner_id === userId) {
            await update({
                name,
                description
            }).from('spaces')
            .where('id', spaceId)
            return '修改成功'
        }else{
            return '无修改权限'
        }
    } catch (error) {
        console.log('更新失败',error)
        throw error
    }
}

exports.getSpaceMembers = async (spaceId) => {
    return table('space_members')
      .join('users', 'space_members.user_id', '=', 'users.id')
      .select(
        'users.id',
        'users.username',
        'users.email',
        'space_members.role',
        'space_members.joined_at'
      )
      .where('space_members.space_id', spaceId)
  }

// 删除空间
exports.deleteSpace = async (spaceId, userId) => {

}
// 更新空间
exports.updateSpace = async (spaceId, userId) => {

}