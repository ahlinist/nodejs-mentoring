const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user-router.js");
const groupRouter = require("./routers/group-router.js");

const app = express();
const port = 3000;

const requestInfoLogger = (req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request params: ${JSON.stringify(req.query)}`);
  next();
}

const errorHandler = (err, req, res, next) => {
  console.log(`OMG! Error! ${err}`);
  res.status(500).send("With a terrible regret we inform you, oh dear user, that something went wrong. Please keep patience. This is the way.");
  next();
}

const promiseRejection = (req, res, next) => {
  process.on('unhandledRejection', (reason, p) => {
    console.log("Ololo! A promise got rejected!");
  });
  next();
}

app.use(bodyParser.json());
app.use(requestInfoLogger);

app.use("/users", userRouter);
app.use("/groups", groupRouter);

app.use(promiseRejection, errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
