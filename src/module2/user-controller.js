const userService = require("./user-service.js");
const validator = require("./validator.js");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const suggest = (req, res) => {
  const q = req.query.q;
  const limit = parseInt(req.query.limit);
  const logins = userService.suggest(q, limit);
  res.send(logins || createError.NotFound("Nothing to suggest"));
};

const get = (req, res) => {
  const id = req.params.id;
  const user = userService.get(id);
  res.send(user || createError.NotFound(`No user found with id ${id}`));
};

const create = (req, res) => {
  const user = parseUser(req.body);
  const validationError = validator.user(user);

  if (validationError) {
    res.send(createError.BadRequest(validationError));
  } else {
    if (userService.existsByLogin(user.login)) {
      res.send(createError.Conflict([`User with login '${user.login}' already exists`]));
    } else {
      res.status(StatusCodes.CREATED).send(userService.create(user));
    }
  }
};

const update = (req, res) => {
  const id = req.params.id;
  const user = parseUser(req.body);

  if (userService.exists(id)) {
      res.status(StatusCodes.NO_CONTENT)
        .send(userService.update(id, user));
  } else {
      res.status(StatusCodes.CREATED)
        .send(userService.create(user));
  }
};

const remove = (req, res) => {
  userService.remove(req.params.id);
  res.status(StatusCodes.NO_CONTENT)
    .send();
};

const parseUser = payload => {
    return {
        login: payload.login,
        password: payload.password,
        age: parseInt(payload.age)
    };
};

module.exports = { suggest, get, update, create, remove };
