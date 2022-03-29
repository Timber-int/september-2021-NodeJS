import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';
import { config } from '../config';
import { EmailActionEnum, emailInfo } from '../EmailInformation';

class EmailService {
    templateRenderer = new EmailTemplates({
        views: {
            root: path.join(__dirname, '../', 'emailTemplates'),
            options: {
                extension: 'hbs',
            },
        },
    });

    async sendMail(userEmail: string, action: EmailActionEnum, context = {}) {
        const {
            subject,
            templateName,
        } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'https://google.com', someArt: 'https://ih1.redbubble.net/image.3290152445.8821/st,small,507x507-pad,600x600,f8f8f8.jpg' });

        const html = await this.templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'Bobo',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        emailTransporter.sendMail({
            to: userEmail,
            html,
            subject,
        });
    }
}

export const emailService = new EmailService();
