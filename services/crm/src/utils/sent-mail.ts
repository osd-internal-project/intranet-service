import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  // port: 465,
  service: 'hotmail', // use SSL
  // auth: {
  //   user: 'taksapong70@gmail.com',
  //   pass: 'mnot wowm sooe hmnh',
  // },
  auth: {
    user: 'taksapongk@osd.co.th',
    pass: 'z8kvu#t9',
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sentMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'taksapongk@osd.co.th', // sender address
    to: 'wasmeej@osd.co.th',
    subject: 'สวัสดีอาวัส ✔', // Subject line
    html: `<body><div >Test Email</div></body>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
