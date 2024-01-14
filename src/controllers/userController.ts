import { UserModel } from '@/models/user'
import { sendValidationMailTo } from '@/services/mailService'
import {
  findUserByEmail,
  updateUserByEmail,
  insertDummyUser,
} from '@/services/userService'
import ResponseHelper from '@/utils/ResponseHelper'
import { validateUserRegister } from '@/utils/validation_back'

import bcrypt from 'bcrypt'

import { NextRequest } from 'next/server'

const getJsonData = async (req: NextRequest) => {
  try {
    const reqData = await req.json()
    return reqData
  } catch (_) {
    return null
  }
}

export const registerUser = async (req: NextRequest) => {
  try {
    const reqData = await getJsonData(req)

    if (!reqData) return ResponseHelper.error('invalid json format')

    const newUser: UserModel = reqData

    // 인풋 정보가 스키마를 위반한 경우.
    const { error } = validateUserRegister(newUser)
    if (error) return ResponseHelper.error(error.message)

    const hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash

    const user: UserModel = await findUserByEmail(newUser.email)

    // 더미 유저가 없는 경우.
    if (!user) return ResponseHelper.error('verfication required', 400, 1001)

    // 유저가 이미 있는 경우.
    if (user?.canLogin) return ResponseHelper.error('user already exist')

    // 유저가 본인 인증을 틀린 경우.
    if (user && !user.isVerified)
      return ResponseHelper.error('verification required', 200, 1200)

    const result = await updateUserByEmail(user.email, {
      name: newUser.name,

      password: newUser.password,
      isInit: true,
    })
    console.log(result)
    return ResponseHelper.success()
  } catch (err: any) {
    console.log(err.message)
    return ResponseHelper.internalError(err.message)
  }
}

export const sendValidationCodeToUser = async (req: NextRequest) => {
  try {
    const reqData = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid input data')

    const email = reqData
    const user: UserModel = await findUserByEmail(email)

    // 더미 유저 등록이 안 된 경우.
    if (!user) {
      await insertDummyUser({
        email: email,
        name: 'not yet',
        password: 'not yet',
      })
    } else if (user && user.isVerified) {
      // 유저가 이미 인증 유효한 경우.
      return ResponseHelper.error('already verified.', 200, 1200)
    }

    const validationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    const codeIssuedUser = await updateUserByEmail(email, { validationCode })
    console.log(email, 'email')
    sendValidationMailTo(email, validationCode)
    return ResponseHelper.success()
  } catch (err: any) {
    console.log(err.message)
    return ResponseHelper.internalError(err.message)
  }
}

export const verifyUser = async (req: NextRequest) => {
  try {
    const reqData = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid input data')

    const { email, code } = reqData
    const user = await findUserByEmail(email)

    // 유저 등록이 안 된 경우.
    if (!user) return ResponseHelper.error('not found user')

    // 3분 시간 경과한 경우.
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000)
    if (new Date(user.updatedAt) < threeMinutesAgo)
      return ResponseHelper.error('time out', 400, 1200)

    // 코드가 일치하지 않는 경우.
    if (!code.includes(user.validationCode)) {
      return ResponseHelper.error('no matched code')
    }

    const verifiedUser = await updateUserByEmail(email, { isVerified: true })
    console.log(verifiedUser)
    return ResponseHelper.success()
  } catch (err: any) {
    console.log(err.message)
    return ResponseHelper.internalError(err.message)
  }
}
