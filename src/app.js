const express = require("express");
const { applyPreMiddlewares, applyPostMiddlewares } = require("./middlewares");
const app = express();

applyPreMiddlewares(app);

applyPostMiddlewares(app);

module.exports = app;
