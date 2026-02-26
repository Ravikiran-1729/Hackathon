const validations = require('../models/modalValidations');

const validateUserSchema = (req, res, next) =>{
    const {error, value} = validations.User_Joi.validate(req.body);

    if(error){
        console.log(error.details);
        return res.redirect('/auth/signup');
    }
    next();
}

module.exports = {
    validateUserSchema,
}