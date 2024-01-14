import User, { UserModel } from '@/models/user'
import Database from '@/utils/database'

import { UpdateQuery } from 'mongoose'

export const findUserByEmail = async (email: string) => {
  await Database.getInstance()
  return await User.findOne({ email: email })
}

export const insertDummyUser = async (user: UserModel) => {
  await Database.getInstance()

  return await new User({
    ...user,
    isVerified: false,
    validationCode: 0,
    isInit: false,
    my_course: [],
  }).save()
}

export const updateUserByEmail = async (
  email: string,
  update: UpdateQuery<any>,
) => {
  await Database.getInstance()
  return await User.findOneAndUpdate({ email: email }, update, { new: true })
}
