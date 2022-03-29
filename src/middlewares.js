const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const notFoundMiddleware = (req, res, next) => {
  res.status(404);

  const error = new Error("Route not found");
  return next(error);
};

const errorHandler = (err, req, res, next) => {
  if (res.statusCode === 200) res.status(500);

  return res.json({
    ok: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : "🚫",
    },
  });
};

exports.applyPreMiddlewares = (app) => {
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

exports.applyPostMiddlewares = (app) => {
  app.all("*", notFoundMiddleware);
  app.use(errorHandler);
};
