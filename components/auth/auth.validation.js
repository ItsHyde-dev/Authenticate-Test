import joi from 'joi'
export const signupSchema = joi.object({
  name: joi.string().min(1).required(),
  number: joi.string().length(10).pattern(new RegExp("^[0-9]+$")).required(),
  password: joi.string().min(6).required(),
  email: joi.string().email()
})

export const loginSchema = joi.object({
  number: joi.string().length(10).pattern(new RegExp("^[0-9]+$")).required(),
  password: joi.string().min(6).required(),
})
