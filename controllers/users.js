const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  RES_OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require('../errors/error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(RES_OK).send(users))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      } else {
        res.status(RES_OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'При запросе пользователя id передан некорректно' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(RES_OK).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      }
      res.status(RES_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      }
      res.status(RES_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  let userId;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    // eslint-disable-next-line consistent-return
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: userId },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Данные сохранены' });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
