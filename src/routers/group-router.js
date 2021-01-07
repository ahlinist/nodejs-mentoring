const express = require("express");
const groupController = require("../controllers/group-controller.js");

const router = express.Router();

router.get("/", groupController.getAll);

router.get("/:id", groupController.get);

router.post("/", groupController.create);

router.put("/:id", groupController.update);

router.delete("/:id", groupController.remove);

module.exports = router;
