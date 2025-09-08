import { createTransport } from 'nodemailer'

export const sendValidationMailTo = async (email: string, code: number) => {
  const context =
    '안녕하세요.\n이 이메일 주소로 랩키드 패스파인더에 가입 요청이 있었습니다.\n본인이 맞다면 다음 인증코드를 입력해주세요.\n인증코드:'

  const mailOptions = {
    from: '"랩키드 패스파인더" <team3@ducogen.net>', // 발신자 이메일
    to: email, // 수신자 이메일
    subject: '[랩키드 패스파인더] 이메일 인증코드입니다.', // 이메일 제목
    text: `\n${context} ${code}\n\n감사합니다. 랩키드 패스파인더 드림.`, // 이메일 본문
  }

  return await createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'team3@ducogen.net',
      pass: 'sxrf bndo czls didb',
    },
    options: mailOptions,
  }).sendMail(mailOptions)
}
