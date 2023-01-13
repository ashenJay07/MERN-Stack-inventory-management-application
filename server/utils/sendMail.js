const nodemailer = require('nodemailer');

const sendMail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PSW,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Options for sending mail
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send mail
  transporter.sendMail(options, function (err, info) {
    if (err) console.log(err);

    console.log(info);
  });
};
module.exports = sendMail;
