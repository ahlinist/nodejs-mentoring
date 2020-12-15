const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./user-router.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
