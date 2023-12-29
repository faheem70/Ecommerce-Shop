const nodeMailer = require("nodemailer");

const sendRegistrationEmail = async (recipientEmail, subject, text, html) => {
    // Create a separate email function for registration emails
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: recipientEmail,
        subject: subject,
        text: text, // Plain text message for registration
        html: html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendRegistrationEmail