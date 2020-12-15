const userService = require("./user-service.js");
const validator = require("./validator.js");

const suggest = (req, res) => {
  const q = req.query.q;
  const limit = parseInt(req.query.limit);
  const logins = userService.suggest(q, limit);
  if (logins) {
      res.send(logins);
  } else {
      res.status(404);
      res.send("Nothing to suggest");
  }
};

const get = (req, res) => {
  const id = req.params.id;
  const user = userService.get(id);
  if (user) {
      res.send(user);
  } else {
      createError.NotFound
      res.status(404);
      res.send(`No user found with id ${id}`);
  }
};

const create = (req, res) => {
  const user = parseUser(req.body);
  const validationError = validator.user(user);
  let response;

  if (validationError) {
    res.status(400);
    response = validationError;
  } else {
    if (userService.existsByLogin(user.login)) {
      res.status(209);
      response = [`User with login '${user.login}' already exists`];
    } else {
      const persistentUser = userService.create(user);
      res.status(201);
      res.location(`/users/${persistentUser.id}`);
      response = persistentUser;
    }
  }

  res.send(response);
};

const update = (req, res) => {
  const id = req.params.id;
  const user = parseUser(req.body);
  let persistentUser;

  if (userService.exists(id)) {
      persistentUser = userService.update(id, user);
      res.status(204);
  } else {
      persistentUser = userService.create(user);
      res.location(`/users/${persistentUser.id}`);
      res.status(201);
  }

  res.send(persistentUser);
};

const remove = (req, res) => {
  userService.remove(req.params.id);
  res.status(204);
  res.send();
};

const parseUser = payload => {
    return {
        login: payload.login,
        password: payload.password,
        age: parseInt(payload.age)
    };
};

module.exports = { suggest, get, update, create, remove };
