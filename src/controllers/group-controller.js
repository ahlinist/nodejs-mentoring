const groupService = require("../services/group-service.js");
const validator = require("../utils/validator.js");
const { StatusCodes } = require("http-status-codes");

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const group = await groupService.get(id);
    group ? res.send(group) : res.status(StatusCodes.NOT_FOUND).send(`No group found with id ${id}`);
    next();
  } catch(e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try{
    const group = parseGroup(req.body);
    const validationError = validator.group(group);
  
    if (validationError) {
      res.status(StatusCodes.BAD_REQUEST).send(validationError);
    } else {
      try {
        res.status(StatusCodes.CREATED).send(await groupService.create(group));
      } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
      }
    }
    next();
  } catch(e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const group = parseGroup(req.body);
  
    if (await groupService.get(id)) {
        res.status(StatusCodes.NO_CONTENT).send(await groupService.update(id, group));
    } else {
        res.status(StatusCodes.CREATED).send(await groupService.create(group));
    }
    next();
  } catch(e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await groupService.remove(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
    next();
  } catch(e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    res.send(await groupService.getAll());
    next();
  } catch(e) {
    next(e);
  }
};

const addUsersToGroup = async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.id);
    const userIds = req.body;
    await groupService.addUsersToGroup(userIds, groupId);
    res.status(StatusCodes.NO_CONTENT).send();
    next();
  } catch(e) {
    next(e);
  }
};

const parseGroup = payload => {
  return {
      name: payload.name,
      permissions: payload.permissions,
  };
};

module.exports = { get, getAll, update, create, remove, addUsersToGroup };
