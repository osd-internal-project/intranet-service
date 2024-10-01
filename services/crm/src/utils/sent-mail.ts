import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  // service: 'gmail', // use SSL
  auth: {
    user: 'taksapong70@gmail.com',
    pass: 'mnot wowm sooe hmnh',
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sentMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'เราเอง', // sender address
    to: 'aekkung500@gmail.com',
    subject: 'Hello ✔', // Subject line
    html: `<body><div >วันลา</div></body>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
