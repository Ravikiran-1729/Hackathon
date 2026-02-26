// src/routes/chat.routes.js
const router = require("express").Router();
const passport = require("passport");
const { generateFromNotes } = require("../controllers/chat.controller");

// ✅ Protect route with JWT authentication
// Assumes passport-jwt is already configured in app.js
router.post(
    "/generate",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            // Optional: enforce ownership of notes
            // req.user._id is from JWT payload
            const { noteIds } = req.body;
            if (!Array.isArray(noteIds) || noteIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "noteIds array is required"
                });
            }

            // Forward to controller
            await generateFromNotes(req, res);
        } catch (err) {
            console.error("🔥 [CHAT ROUTE] Error:", err.message);
            next(err);
        }
    }
);

module.exports = router;
