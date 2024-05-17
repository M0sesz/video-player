const { videoUpload } = require("../middlewares/videoUpload");

const router = require("express").Router();

router.post("/upload", videoUpload.single("video"));

module.exports = router;
