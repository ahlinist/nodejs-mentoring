const userDao = require("../dao/user-dao.js");

const create =  (user) => {
    return userDao.create(user);
};

const get = id => {
    return userDao.getById(id);
};

const update = (id, user) => {
    return userDao.update(id, user);
};

const existsByLogin = login => {
    return userDao.existsByLogin(login);
};

const remove = id => {
    userDao.remove(id);
};

const suggest = (query, limit) => {
    return userDao.suggest(query, limit)
      .then(users => users.map(user => user.login))
      .then(logins => logins.sort());
};

module.exports = {create, get, update, remove, suggest, existsByLogin};
