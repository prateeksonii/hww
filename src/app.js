const express = require("express");
const { applyPreMiddlewares, applyPostMiddlewares } = require("./middlewares");

const router = require("./routes");

const app = express();

applyPreMiddlewares(app);

app.use("/api/v1", router);

applyPostMiddlewares(app);

module.exports = app;
