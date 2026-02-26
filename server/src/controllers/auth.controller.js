const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}
const asyncWrap = require('../utils/asyncWrap');
// const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const authServices = require('../services/auth.service');


// const renderLoginForm = (req, res) =>{
//     return res.render('auth_pages/login.ejs');
// }


// const renderSignupForm = (req, res) =>{
//     res.render('auth_pages/signup.ejs');
// }



const login = (req, res) => {
    const user = req.user;

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        });


    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res.redirect('/home',);
    return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
    });
}
const signup = asyncWrap(async (req, res) => {
    const { username, email, password } = req.body.user;

    const registeredUser = await authServices.establishNewUser(
        { username, email },
        password
    );

    if (!registeredUser) {
        throw new AppError(400, "Registration failed");
    }

    const token = jwt.sign(
        {
            id: registeredUser._id,
            email: registeredUser.email,
            username: registeredUser.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: registeredUser._id,
            email: registeredUser.email,
            username: registeredUser.username,
        },
    });
});

module.exports = {
    // renderLoginForm,
    // renderSignupForm,
    login,
    signup
};