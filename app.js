const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.static(path.join((__dirname, ''))));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6443f8e4dccb6a329b9e7e72',
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
