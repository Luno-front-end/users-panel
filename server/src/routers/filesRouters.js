const Router = require("express");
const uploadFileControllers = require("../controllers/uploadFileControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.post("/upload", authMiddleware, uploadFileControllers.uploadFile);
router.get("/download", authMiddleware, uploadFileControllers.downloadFile);
router.get("/", authMiddleware, uploadFileControllers.getFile);

module.exports = router;
