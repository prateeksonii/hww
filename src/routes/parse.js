const { parseCSV } = require("../controllers/parseController");

const router = require("express").Router();

router.get("/", parseCSV);

module.exports = router;
