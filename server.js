const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL, {})
  .then((res) => console.log("connected to db"))
  .catch((error) => console.log("error db", error));

const allowedOrigins = ["https://zhenkaaf.github.io", "http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, DELETE, PUT, OPTIONS",
    accessControlAllowHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.options("/auth/register", (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.options("/auth/login", (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.use("/auth", authRoute);

app.listen(PORT, (error) => {
  error
    ? console.log("listen***", error)
    : console.log(`listening port ${PORT}`);
});
