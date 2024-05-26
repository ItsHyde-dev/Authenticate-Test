import joi from "joi";
export const nameSearchSchema = joi.object({
  name: joi.string().min(1).required(),
  skip: joi.number().min(0).required(),
  limit: joi.number().min(0).required()
});

export const numberSearchSchema = joi.object({
  number: joi.string().pattern(new RegExp("^[+\(\)\-\.\\s0-9]+$")).required(),
  skip: joi.number().min(0).required(),
  limit: joi.number().min(0).required()
});

export const idSearchSchema = joi.object({
  number: joi.string().pattern(new RegExp("^[+\(\)\-\.\\s0-9]+$")).required(),
});
