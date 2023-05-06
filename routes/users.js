const usersRouter = require('express').Router();
const {
  validateUserProfile,
  validateUserAvatar,
} = require('../validate/validateRequest');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', validateUserProfile, updateProfile);
usersRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);
usersRouter.get('/me', getCurrentUser);

module.exports = usersRouter;
