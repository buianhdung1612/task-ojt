const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller.js")
const userMiddleware = require("../../middlewares/client/user.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", controller.resetPassword);
router.get("/profile", userMiddleware.requireAuth, controller.profile);
router.get("/list", userMiddleware.requireAuth, controller.list);
router.get("/allUsers", userMiddleware.requireAuth, controller.allUsers);

module.exports = router;