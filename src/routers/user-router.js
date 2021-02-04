const express = require("express");
const userController = require("../controllers/user-controller.js");

const router = express.Router();

router.get("/suggest", userController.suggest);

router.get("/:id", userController.get);

router.post("/", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.remove);

module.exports = router;
