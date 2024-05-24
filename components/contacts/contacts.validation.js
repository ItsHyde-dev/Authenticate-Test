import joi from 'joi'
export const markSpamSchema = joi.object({
  name: joi.string().min(1),
  number: joi.string().length(10).pattern(new RegExp("^[0-9]+$")).required(),
  userNumber: joi.string().length(10).pattern(new RegExp("^[0-9]+$")).required()
})
