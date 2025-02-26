import Joi from "joi";

export const userValidator = Joi.object({
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	phone: Joi.string().min(9).max(12).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(5).required(),
});
