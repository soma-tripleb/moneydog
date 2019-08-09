const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//Databases
const db = require('./db/mongoDB');

//MiddleWares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HTTP 접근 제어 혹은 CORS(Cross-origin resource sharing, 출처가 다른 곳끼리 자원 공유
app.use(cors());

//Api
const indexRouter = require('./api/index');
const usersRouter = require('./components/user/userController');
const subscribeInfo = require('./api/subscribeInfo');
const subscriptionRouter = require('./components/subscription/subscriptionController');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribeInfo', subscribeInfo);
app.use('/subscriptions', subscriptionRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
