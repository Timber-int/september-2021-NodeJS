import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';
import { config } from '../config';
import { EmailActionEnum, emailInfo } from '../EmailInformation';
import { CONSTANTS } from '../constants';

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

        Object.assign(context, {
            warShip: CONSTANTS.WAR_SHIP_URL,
        });

        const html = await this.templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'Bobo',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        await emailTransporter.sendMail({
            to: userEmail,
            html,
            subject,
        });
    }
}

export const emailService = new EmailService();
