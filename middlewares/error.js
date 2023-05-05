const error = ((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

module.exports = error;
