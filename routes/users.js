const usersRouter = require('express').Router();
const {
  validateUserProfile,
  validateUserAvatar,
  validateUserId,
} = require('../validate/validateRequest');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUser);
usersRouter.patch('/me', validateUserProfile, updateProfile);
usersRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = usersRouter;
