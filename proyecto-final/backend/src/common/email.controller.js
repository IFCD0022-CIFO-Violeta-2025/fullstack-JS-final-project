import nodemailer from 'nodemailer';
import config from '../config/config.js'
//import SendmailTransport from 'nodemailer/lib/sendmail-transport';



// Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

const transporter = nodemailer.createTransport({
  host: config.email_host,
  port: config.email_port,
  secure: config.email_secure, // true for 465, false for other ports
  auth: {
    user: config.email_user,
    pass: config.email_password,
  },
});

// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//     to: "bar@example.com, baz@example.com",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();

export async function sendMail (mailData) {
  return await transporter.sendMail({
    from: mailData.from,
    to: mailData.to,
    subject: mailData.subject,
    text: mailData.text, // plain‑text body
    html: mailData.html, // HTML body
  });
};

export async function sendConfirmationLink(mailData,token)
{
    const urlConfirm = config.email_link_confirm + `email=${mailData.to}&token=${token}`

    let htmlEmail = `Por favor, confirme sus datos clicando <a href="::url">AQUI</a>`

    if (typeof mailData.html !== 'undefined')
    {
        htmlEmail = mailData.html
    }

    htmlEmail = htmlEmail.replace('::url',urlConfirm)

    mailData.html = htmlEmail
    
    if (typeof mailData.subject === 'undefined') mailData.subject = `Confirmación registro en Armand Events`
    if (typeof mailData.from === 'undefined') mailData.from = config.email_from_confirm

    console.log(`Enviando correo de confirmación de usuario ${mailData.to}`)

    sendMail(mailData);
}