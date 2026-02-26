const User = require('../models/user.model');
const AppError = require('../utils/AppError');

const registerUser = async (user, password) => {
    const exists = await User.exists({ email: user.email });
    if (exists) {
        throw new AppError(409, 'Email already exists');
    }

    const newUser = new User({
        username: user.username,
        email: user.email,
    });

    const registeredUser = await User.register(newUser, password);
    return registeredUser;
};

const establishNewUser = async (userCredentials, password) => {
    return registerUser(userCredentials, password);
};

module.exports = {
    registerUser,
    establishNewUser,
};