import express from "express";
import bodyParser from "body-parser";
import * as userService from "./user-service.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

//TODO: implement autosuggest

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
    const persistentUser = userService.create(user);
    res.status(201);
    res.location(`/users/${persistentUser.id}`);
    res.send(persistentUser);
  });

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
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
