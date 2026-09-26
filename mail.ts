import nodemailer from 'nodemailer';

export async function sendEmail(to:string, subject:string, text:string) {
  const required=['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','MAIL_FROM'];
  for (const k of required) if (!process.env[k]) throw new Error(`Missing ${k}`);
  const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:Number(process.env.SMTP_PORT),
    secure:process.env.SMTP_SECURE === 'true',
    auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}
  });
  return transporter.sendMail({from:process.env.MAIL_FROM,to,subject,text});
}
