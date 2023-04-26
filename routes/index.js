const router = require('express').Router();
const { NOT_FOUND } = require('../errors/error');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Что-то пошло не так' });
});

module.exports = router;
