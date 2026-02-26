// src/app.js
const path = require("path");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("./models/user.model");
const ejsMate = require("ejs-mate");

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Optional if you use sockets later

// --- View Engine ---
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// --- Middleware ---
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const cors = require('cors');
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// --- Passport JWT ---
const cookieExtractor = (req) => req?.cookies?.accessToken || null;

const jwtOpts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(jwtOpts, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id).select("-password");
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());

// --- Routes ---
app.use("/AskMyNotes", require("./routes/auth.route"));
app.use("/upload", require("./routes/upload.route"));
app.use("/chat", require("./routes/chat.route")); // fixed file name

// Optional: home route
// app.use("/AskMyNotes/home", require("./routes/home.route"));

// --- Error Middleware ---
app.use(require("./middlewares/error.middleware"));

// --- Exports ---
module.exports = {
    server,
    io // exported for socket usage
};