import nodemailer from 'nodemailer';
import { config } from '../config';
import { emailActionEnum, emailInfo } from '../emailTemplates';

class EmailService {
    sendMail(userEmail: string, action: emailActionEnum) {
        const {
            subject,
            html,
        } = emailInfo[action];

        const emailTransporter = nodemailer.createTransport({
            from: 'Timber',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
