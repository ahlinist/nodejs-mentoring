const users = {};

const create = (user) => {
    const id = Math.max(Object.keys(users)) + 1; //TODO: use uuid
    user.id = id; 
    users[id] = user;
    return user;
};

const get = id => {
    const user = users[id];
    return user && user.isDeleted ? null : user
};

const update = (id, user) => {
    user.id = id;
    users[id] = user;
    return user;
};

const exists = id => {
    return users.hasOwnProperty(id);
};

const remove = id => {
    if (exists(id)) {
        users[id].isDeleted = true;
    }
};

export {create, get, update, exists, remove};
