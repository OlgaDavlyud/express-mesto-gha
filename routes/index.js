const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
