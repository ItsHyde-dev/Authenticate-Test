import joi from 'joi'
export const signupSchema = joi.object({
  name: joi.string().trim().min(1).required(),
  number: joi.string().trim().pattern(new RegExp("^[+\(\)\-\.\\s0-9]+$")).required(),
  password: joi.string().trim().min(6).required(),
  email: joi.string().email()
})

export const loginSchema = joi.object({
  number: joi.string().pattern(new RegExp("^[+\(\)\-\.\\s0-9]+$")).required(),
  password: joi.string().min(6).required(),
})
