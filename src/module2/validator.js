import Joi from "joi";

const userSchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))
        .message("Password should contain 1 letter and 1 number")
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
});

const user = payload => {
    const validation = userSchema.validate(payload);

    if (validation.error) {
        return validation
            .error
            .details
            .map(detail => detail.message);
    }
};

export {user};
