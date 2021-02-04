const Group = require("../db/models/").Group;

const create = group => {
    return Group.create(group);
};

const getById = id => {
    return Group.findOne({
        where: {
          id: id
        },
      });
};

const update = (id, group) => {
    return Group.update(group,
        { where: { id: id } }
      );
};

const getAll = () => {
    return Group.findAll();
};

const remove = id => {
    Group.destroy({
        where: {
            id: id
        }
    })
};

module.exports = { create, getById, update, remove, getAll };
