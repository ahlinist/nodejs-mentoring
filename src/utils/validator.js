const Joi = require("joi");

const allowedPermissions = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

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

const groupSchema = Joi.object({
    name: Joi.string()
        .required(),
    permissions: Joi.array()
        .error(() => new Error(`Only the following permissions are supported: ${allowedPermissions}`))
        .items(...allowedPermissions)
        .required()
});

const user = payload => {
    return validate(payload, userSchema);
};


const group = payload => {
    return validate(payload, groupSchema);
};

const validate = (payload, schema) => {
    const validation = schema.validate(payload);

    if (validation.error) {
        console.log(`Errors: \n${validation.error}`)
        const details = validation.error.details;
        return details ? details.map(detail => detail.message) : `${validation.error}`;
    }
};

module.exports = { user, group };
