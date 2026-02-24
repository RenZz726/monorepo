const express = require("express");
const app = express();

const todoRoute = require("./modules/todos/list");
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const isLocalDevOrigin = (origin) =>
  /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (!requestOrigin || corsOrigins.includes(requestOrigin) || isLocalDevOrigin(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", requestOrigin || corsOrigins[0]);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/todos", todoRoute);

module.exports = app;
