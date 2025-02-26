import Joi from "joi";

export const userValidator = Joi.object({
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	phone: Joi.string().min(9).max(12).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(5).required(),
});

export const bookValidator = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	pages: Joi.number().min(10).max(500).required(),
	year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
	price: Joi.number().min(1).required(),
	country: Joi.string().min(3).max(100).required(),
	author: Joi.string().min(3).max(100).required(),
	description: Joi.string().min(10).max(500).required(),
});
