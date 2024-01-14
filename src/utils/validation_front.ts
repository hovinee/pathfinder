import Joi from 'joi'

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')),
})

export function validateEmail(email: string) {
  return schema.validate({ email: email })
}

export function validatePassword(password: string) {
  return schema.validate({ password: password })
}
