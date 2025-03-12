/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2025-03-11 19:50:17
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-03-12 14:33:04
 * 
 */
const nodemailer = require('nodemailer');
const SMTP  = require('nodemailer/lib/smtp-transport');

class EmailService {
    constructor() {
        // 配置 SMTP 服务（以 Gmail 为例）
        this.transport = new SMTP({
            service: 'qq',
            port: 587,
            host: 'smtp.qq.com',
            secure: false, // true for 465
            auth: {
                user: '1272449367@qq.com', // 你的 Gmail 地址
                pass: 'ysdgpslirsozbagj', // 应用专用密码
            },
        });

        this.mailer = nodemailer.createTransport(this.transport);
    }


    /**
      * 发送单封邮件
      * @param {string[]} to - 收件人邮箱数组
      * @param {string} subject - 主题
      * @param {string} text - 纯文本内容
      * @param {string} html - HTML 内容（可选）
      * @param {Array<{ filename: string, content: Buffer }>[]} attachments - 附件
      */
    async send(mailOption) {
        try {
            const info = await this.mailer.sendMail(mailOption);
            console.log('邮件发送成功:', info.response);
            return true;
        } catch (error) {
            console.error('邮件发送失败:', error);
            return false;
        }
    }

    /**
     * 发送模板化邮件（支持 EJS 模板）
     * @param {string} templatePath - 模板文件路径
     * @param {Object} data - 模板变量数据
     */
    async sendTemplate(templatePath, data) {
        // 读取模板文件
        const template = require('fs').readFileSync(templatePath, 'utf-8');
        // 使用 EJS 渲染模板
        const html = ejs.render(template, data);
        return this.send(data.to, data.subject, '', html);
    }
}

module.exports = EmailService