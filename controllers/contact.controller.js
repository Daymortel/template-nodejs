import nodemailer from "nodemailer";

export const send = async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "grannus.o2switch.net",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        },
    });
    try {
        await transporter.sendMail({
            from: req.body.name,
            to: 'test@gmail.com',
            subject: 'My object',
            html: `<p>My message.</p>
                `
        });
        res.send("<script>alert('Message envoyé avec succès !'); window.location.href = '/';</script>");
    } catch (err) {
        console.log(err.message);
        res.send("<script>alert('Erreur lors de l'envoie du message !'); window.location.href = '/';</script>");
    }
}
