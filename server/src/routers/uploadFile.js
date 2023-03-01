const Router = require("express");
const uploadFileControllers = require("../controllers/uploadFileControllers");
const router = new Router();

router.post("/upload", uploadFileControllers.uploadFile);

module.exports = router;
