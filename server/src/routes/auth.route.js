const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const validator = require('../middlewares/validator.middleware');

const router = express.Router();

// router.get('/login', authController.renderLoginForm);

// router.post('/login',
//     passport.authenticate('local', {session : false, failureRedirect : '/auth/login'}),
//     authController.login,
// ); 

// router.get('/signup', authController.renderSignupForm);



router.post(
    '/login',
    (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: info?.message || "Invalid credentials",
                });
            }

            req.user = user;
            next();
        })(req, res, next);
    },
    authController.login
);



router.post('/signup',
    validator.validateUserSchema,
    authController.signup
);


// exports.signup = async (req, res) => {
//     try {
//         const { username, email, password, repeat_password } = req.body.user;

//         if (password !== repeat_password)
//             return res.status(400).json({ message: "Passwords do not match" });

//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser)
//             return res.status(400).json({ message: "User already exists" });

//         const user = new User({ username, email, password });
//         await user.save();

//         res.status(201).json({ message: "Signup successful" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
module.exports = router;