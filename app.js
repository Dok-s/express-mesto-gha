const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./utils/errors/errors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '647e0df62c588199013aedb2',
  };

  next();
});

app.use(router);
app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Ресурс не найден',
  });
});

app.listen(PORT);
