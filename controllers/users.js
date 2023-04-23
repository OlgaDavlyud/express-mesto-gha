const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: 'Такого пользователя нет' });
      } else {
        res.status(200).res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'При запросе пользователя id передан некорректно' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  const user = User.create({ name, about, avatar });

  return res.status(200).send({
    _id: user._id,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
};

const updateProfile = (req, res) => {
  res.send(req);
};

const updateAvatar = (req, res) => {
  res.send(req);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
