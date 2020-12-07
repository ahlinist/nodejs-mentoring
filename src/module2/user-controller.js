import express from "express";
import bodyParser from "body-parser";
import * as userService from "./user-service.js";
import * as validator from "./validator.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/users/suggest', (req, res) => {
  const q = req.query.q;
  const limit = parseInt(req.query.limit);
  const logins = userService.suggest(q, limit);
  if (logins) {
      res.send(logins);
  } else {
      res.status(404);
      res.send("Nothing to suggest");
  }
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = userService.get(id);
    if (user) {
        res.send(user);
    } else {
        res.status(404);
        res.send(`No user found with id ${id}`);
    }
});

app.post('/users', (req, res) => {
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
  });

app.put('/users/:id', (req, res) => {
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
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    userService.remove(id);
    res.status(204);
    res.send();
  });

const parseUser = payload => {
    return {
        login: payload.login,
        password: payload.password,
        age: parseInt(payload.age)
    };
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
