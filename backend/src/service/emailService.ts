import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';
import { config } from '../config';
import { CONSTANTS } from '../constants';
import { EmailActionEnum, emailInfo } from '../emailInformation';

class EmailService {

    templateRenderer = new EmailTemplates({
        views: {
            root: path.join(__dirname, '../', 'static'),
            options: {
                extension: 'hbs',
            },
        },
    });

    public async sendMail(userEmail: string, action: Partial<EmailActionEnum>, context: object = {}) {
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
