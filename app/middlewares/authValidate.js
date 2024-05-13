const Joi = require("joi");

const signUpValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).required(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net", "id"] },
			})
			.required(),
		password: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.min(6)
			.required(),
	});

	return schema.validate(data);
};

const signInValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "id"] },
		}),
		password: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.min(6)
			.required(),
	}).xor("username", "email");

	return schema.validate(data);
};

module.exports = {
	signInValidation,
	signUpValidation,
};
