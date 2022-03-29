const router = require("express").Router();

const parseRouter = require("./parse");

router.use("/parse", parseRouter);

module.exports = router;
