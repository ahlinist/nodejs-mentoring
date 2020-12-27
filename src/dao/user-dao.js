const User = require("../db/models/").User;
const { Op } = require('sequelize');

const create = user => {
    return User.create({...user, isDeleted: false});
};

const getById = id => {
    return User.findOne({
        where: {
          id: id,
          isDeleted: false, 
        },
      });
};

const update = (id, user) => {
    return User.update(user,
        { where: { id: id } }
      );
};

const remove = id => {
    return User.update(
        { isDeleted: true},
        { where: { id: id } }
      );
};

const existsByLogin = login => {
    return User.findOne({
        where: {
            login: login,
        },
      });
};

const suggest = (query, limit) => {
    return User.findAll({
        where: {
          login: {
            [Op.like]: `%${query}%`
          },
          isDeleted: false,
        },
        limit: limit,
      });
};

module.exports = { create, getById, update, remove, existsByLogin, suggest };
