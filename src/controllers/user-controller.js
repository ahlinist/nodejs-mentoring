const userService = require("../services/user-service.js");
const validator = require("../utils/validator.js");
const { StatusCodes } = require("http-status-codes");

const suggest = async (req, res, next) => {
  const q = req.query.q;
  const limit = parseInt(req.query.limit);
  const logins = await userService.suggest(q, limit);
  logins ? res.send(logins) : res.status(StatusCodes.NOT_FOUND).send("Nothing to suggest");
  next();
};

const get = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.get(id);
  user ? res.send(user) : res.status(StatusCodes.NOT_FOUND).send(`No user found with id ${id}`);
  next();
};

const create = async (req, res, next) => {
  const user = parseUser(req.body);
  const validationError = validator.user(user);

  if (validationError) {
    res.status(StatusCodes.BAD_REQUEST).send(validationError);
  } else {
    if (await userService.existsByLogin(user.login)) {
      res.status(StatusCodes.CONFLICT).send([`User with login '${user.login}' already exists`]);
    } else {
      res.status(StatusCodes.CREATED).send(await userService.create(user));
    }
  }
  next();
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const user = parseUser(req.body);

  if (await userService.get(id)) {
      res.status(StatusCodes.NO_CONTENT).send(await userService.update(id, user));
  } else {
      res.status(StatusCodes.CREATED).send(await userService.create(user));
  }
  next();
};

const remove = async (req, res, next) => {
  await userService.remove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
  next();
};

const parseUser = payload => {
    return {
        login: payload.login,
        password: payload.password,
        age: parseInt(payload.age)
    };
};

module.exports = { suggest, get, update, create, remove };
