const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
