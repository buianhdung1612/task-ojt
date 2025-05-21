const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/task.controller")

router.get("/", controller.index);
router.patch("/changeStatus", controller.changeStatus);
router.patch("/change-multi", controller.changeStatusPatch);
router.post("/create", controller.createPost);
router.patch("/delete", controller.delete);
router.patch("/delete-multi", controller.deleteMultiPatch);
router.patch("/edit/:id", controller.editPatch);
router.get("/detail/:id", controller.detail);
router.get("/allTasks", controller.allTasks);

module.exports = router;