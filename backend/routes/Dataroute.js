const { Router } = require("express");
const dataController = require("../controllers/Datacontroller");

const router = Router();

router.get("/get", dataController.getData);

module.exports = router;
