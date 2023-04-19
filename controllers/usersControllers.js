const User = require('../models/userSchema');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((user) => user.status(200).send(req.body))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
