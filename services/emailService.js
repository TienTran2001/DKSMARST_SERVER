const nodemailer = require('nodemailer');

// Cấu hình transporter của Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'tienco201@gmail.com',
    pass: 'zjgb tnfx gnpv momg',
  },
});

// Hàm gửi email
const sendEmail = async (recipientEmail, subject, message) => {
  try {
    // Tạo email
    const mailOptions = {
      from: '"DKSMART" <tienco201@gmail.com>',
      to: recipientEmail,
      subject: subject,
      html: message,
    };

    // Gửi email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail,
};
