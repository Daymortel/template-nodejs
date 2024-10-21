import { Request, Response } from 'express';
import nodemailer from "nodemailer";

export class ContactService {
    async contact (from: string, to: string, subject: string, html: string) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
            },
        });
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html
        });
    }
}
