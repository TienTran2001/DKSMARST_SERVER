const nodemailer = require('nodemailer');
const db = require('../models');
const { Op } = require('sequelize');

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

// Lập lịch kiểm tra và gửi email thông báo
const scheduleJob = async () => {
  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 5); // Ngày hết hạn trong tương lai (ví dụ: 5 ngày sau ngày hiện tại)

  try {
    // Lấy danh sách phương tiện gần hết hạn
    const vehicles = await db.Vehicle.findAll({
      where: {
        expiryDate: {
          [Op.between]: [today, expirationDate],
        },
      },

      include: [
        {
          model: db.User,
          attributes: ['fullname', 'email'],
        },
      ],
    });

    // Gửi email thông báo cho chủ sở hữu phương tiện
    for (const vehicle of vehicles) {
      const mailOptions = {
        from: '"DKSMART" <tienco201@gmail.com>',
        to: vehicle?.User?.email,
        subject: `Thông báo: Phương tiện ${vehicle.licensePlate} sắp hết hạn đăng kiểm`,
        html: `
        <p>
          <b>Xin chào ${vehicle?.User?.fullname}</b>
        </p>
        <p>Phương tiện của bạn có biển số <b>${vehicle.licensePlate}</b> sắp hết hạn vào ngày ${vehicle.expiryDate}</p>
        <p>Vui lòng làm mới đăng kiểm kịp thời.</p>
        <p>Trân trọng</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    console.log('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

module.exports = {
  sendEmail,
  scheduleJob,
};
