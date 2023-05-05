const router = require('express').Router();
const auth = require('../middlewares/auth');
const { NOT_FOUND } = require('../errors/error');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use(auth, (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Что-то пошло не так' });
});

module.exports = router;
