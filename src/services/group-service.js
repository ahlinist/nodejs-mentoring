const groupDao = require("../dao/group-dao.js");

const allowedPermissions = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

const create = (group) => {
    group.permissions.forEach(permission => {
        if (!allowedPermissions.includes(permission)) {
            throw `${permission} is an invalid group permission`;
        }
    });

    return groupDao.create(group);
};

const get = id => {
    return groupDao.getById(id);
};

const update = (id, group) => {
    return groupDao.update(id, group);
};

const remove = id => {
    groupDao.remove(id);
};

const getAll = () => {
    return groupDao.getAll();
};

module.exports = {create, get, update, remove, getAll};
