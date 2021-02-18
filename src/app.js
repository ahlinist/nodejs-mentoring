const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user-router.js");
const groupRouter = require("./routers/group-router.js");
const authRouter = require("./routers/auth-router.js");
const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

const app = express();
const port = 3000;

const requestInfoLogger = (req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request params: ${JSON.stringify(req.query)}`);
  next();
}

const errorHandler = (err, req, res, next) => {
  console.log(`OMG! Error! ${err}`);
  console.log(`Request url: ${req.url}\nRequest method: ${req.method}\nRequest params: ${JSON.stringify(req.query)}`);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("With a terrible regret we inform you, oh dear user, that something went wrong. Please keep patience. This is the way.");
  next();
}

const promiseRejection = (req, res, next) => {
  process.on('unhandledRejection', (reason, p) => {
    console.log("Ololo! A promise got rejected!");
  });
  next();
}

const jwtFilter = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    res.status(StatusCodes.UNAUTHORIZED).send();
    next();
  }

  try {
    jwt.verify(authHeader, 'shhhhh');
  } catch(e) {
    res.status(StatusCodes.FORBIDDEN).send();
  }
  next();
}

app.use(bodyParser.json());
app.use(requestInfoLogger);

app.use(/^\/(?!auth\/login).*/, jwtFilter);

app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/auth", authRouter);

app.use(promiseRejection, errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
