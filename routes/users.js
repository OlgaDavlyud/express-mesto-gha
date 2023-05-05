const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.get('/me', getCurrentUser);

module.exports = usersRouter;
