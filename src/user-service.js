const users = {};

const create = (user) => {
    const id = (Object.keys(users).length + 1).toString();
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

const existsByLogin = login => {
    return Object.values(users)
        .map(user => user.login)
        .includes(login);
};

const remove = id => {
    if (exists(id)) {
        users[id].isDeleted = true;
    }
};

const suggest = (query, limit) => {
    console.log(query)
    return Object.values(users)
        .filter(user => !user.isDeleted)
        .map(user => user.login)
        .sort()
        .filter(login => login.includes(query))
        .slice(0, limit);
};

module.exports = {create, get, update, exists, remove, suggest, existsByLogin};
