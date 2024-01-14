import { UserModel } from '@/models/user'

import Joi from 'joi'
import { AddFeedDTO } from '@/models/feed'

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
})

export const registerSchema = Joi.object<UserModel>({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
})

const choiceValidationSchema = Joi.object({
  choice: Joi.string().required(),
  checked: Joi.boolean().required(),
})

const questionTitleValidationSchema = Joi.object({
  title: Joi.string().required(),
  choices: Joi.array().items(choiceValidationSchema).min(0).required(),
})

const base64ImagePattern = /.*base64,.*/
const addCourseDTOValidationSchema = Joi.object({
  thumbnailImg: Joi.string().pattern(base64ImagePattern),
  courseTitle: Joi.string().required(),
  courseInfo: Joi.array().items(Joi.string()).required(),
  courseIntro: Joi.string().required(),
  questionTitle: Joi.array()
    .items(questionTitleValidationSchema)
    .min(0)
    .required(),
})

export function validateUserRegister(user: UserModel) {
  return registerSchema.validate(user)
}

export function validateUserLogin(user: Omit<UserModel, 'userName'>) {
  return loginSchema.validate(user)
}

const addFeedDTOValidationSchema = Joi.object<AddFeedDTO>({
  world: Joi.string().valid('whale', 'train'),
  message: Joi.string().required(),
})

export const validateAddFeedDTO = (data: AddFeedDTO) => {
  return addFeedDTOValidationSchema.validate(data)
}
