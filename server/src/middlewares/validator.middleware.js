const validations = require('../models/modalValidations');

const validateUserSchema = (req, res, next) =>{
    const {error, value} = validations.User_Joi.validate(req.body);

    if(error){
        console.log(error.details);
        return res.status(400).json({
            success: false,
            message: error.details[0]?.message || "Validation error",
            errors: error.details.map(d => d.message),
        });
    }
    next();
}

module.exports = {
    validateUserSchema,
}