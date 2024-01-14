import { UserModel } from '@/models/user'
import { getBaseUrl } from '@/utils/url'

export const postRegister = async (reqData: UserModel): Promise<Response> => {
  return await fetch(`${getBaseUrl}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  })
}

export const postValidationCode = async (email: string): Promise<Response> => {
  return await fetch(`${getBaseUrl}/api/auth/code`, {
    method: 'POST',
    body: JSON.stringify(email),
  })
}

export const postVerify = async (
  email: string,
  code: string,
): Promise<Response> => {
  return await fetch(`${getBaseUrl}/api/auth/verify`, {
    method: 'POST',
    body: JSON.stringify({ email: email, code: code }),
  })
}
