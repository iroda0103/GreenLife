const Joi = require('joi')

exports.postUserSchema = {
    body: Joi.object({
        first_name: Joi.string().trim(),
        last_name: Joi.string().trim(),
        username: Joi.string().trim(),
        role: Joi.string().trim(),
        birthday: Joi.string().trim(),
        email: Joi.string().trim(),
        password: Joi.string().trim().min(4),
    }),
}
