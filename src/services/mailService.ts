import { createTransport } from 'nodemailer'

export const sendValidationMailTo = (email: string, code: number) => {
  const context =
    'Hello.\nSomeone just signed up for Ducogen using this email address.\nIf this is you, enter the following code to verify your email.\ncode:'

  const mailOptions = {
    from: '"ducogen kkpark@ducowise.com"', // 발신자 이메일
    to: email, // 수신자 이메일
    subject: '[Ducogen] Your verfication code.', // 이메일 제목
    text: `\n${context} ${code}\n\nThank you. by Ducogen.`, // 이메일 본문
  }

  return createTransport({
    host: 'smtp.worksmobile.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'kkpark@ducowise.com',
      pass: 'Ducogen@team3!@',
    },
    options: mailOptions,
  }).sendMail(mailOptions)
}
