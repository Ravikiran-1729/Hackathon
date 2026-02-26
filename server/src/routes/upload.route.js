// src/routes/upload.routes.js
const router = require("express").Router();
const upload = require("../middlewares/upload");
const { uploadNotes } = require("../controllers/note.controller");

router.post("/notes/upload", upload.array("files", 3), uploadNotes);

module.exports = router;