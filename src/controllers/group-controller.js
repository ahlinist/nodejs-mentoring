const groupService = require("../services/group-service.js");
const validator = require("../utils/validator.js");
const { StatusCodes } = require("http-status-codes");

const get = async (req, res) => {
  const id = req.params.id;
  const group = await groupService.get(id);
  group ? res.send(group) : res.status(StatusCodes.NOT_FOUND).send(`No group found with id ${id}`);
};

const create = async (req, res) => {
  const group = parseGroup(req.body);
  const validationError = await validator.group(group);

  if (validationError) {
    res.status(StatusCodes.BAD_REQUEST).send(validationError);
  } else {
    try {
      res.status(StatusCodes.CREATED).send(await groupService.create(group));
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const group = parseGroup(req.body);

  if (await groupService.get(id)) {
      res.status(StatusCodes.NO_CONTENT).send(await groupService.update(id, group));
  } else {
      res.status(StatusCodes.CREATED).send(await groupService.create(group));
  }
};

const remove = async (req, res) => {
  await groupService.remove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
};

const parseGroup = payload => {
    return {
        name: payload.name,
        permissions: payload.permissions,
    };
};

const getAll = async (req, res) => {
  res.send(await groupService.getAll());
};

module.exports = { get, getAll, update, create, remove };
