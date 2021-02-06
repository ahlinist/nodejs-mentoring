const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user-router.js");
const groupRouter = require("./routers/group-router.js");

const app = express();
const port = 3000;

const requestInfoLogger = function(req, res, next) {
  console.log(`Request method: ${req.method}`);
  console.log(`Request params: ${JSON.stringify(req.query)}`);
  next();
}

app.use(bodyParser.json());
app.use(requestInfoLogger);
app.use("/users", userRouter);
app.use("/groups", groupRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
