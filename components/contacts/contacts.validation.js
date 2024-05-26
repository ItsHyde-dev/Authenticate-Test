import joi from 'joi'
export const markSpamSchema = joi.object({
  name: joi.string().min(1),
  number: joi.string().pattern(new RegExp("^[+\(\)\-\.\\s0-9]+$")).required(),
})
