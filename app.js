const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const {
  validateLogin,
  validateUser,
} = require('./validate/validateRequest');

const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/users');
const InternalServerError = require('./middlewares/error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(routes);

app.use(errors());
app.use(InternalServerError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
