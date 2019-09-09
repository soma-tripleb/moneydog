const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

import authCheck from './src/security/jwtAuthentication';
import * as Sentry from '@sentry/node';
import {mongoConnect} from './src/dbConfig/mongoDB';

// Error tracking
Sentry.init({dsn: 'https://566bd809b9a0464e8e690a199ab83396@sentry.io/1553162'});

// MiddleWares
mongoConnect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// HTTP 접근 제어 혹은 CORS(Cross-origin resource sharing, 출처가 다른 곳끼리 자원 공유
app.use(cors());

// Api
import indexRouter from './index';
import userRouter from './src/router/user/userController';
import subscriptionRouter from './src/router/subscription/subscriptionController';

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use(authCheck);
app.use('/subscriptions', subscriptionRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(res.sentry + '\n');
});

export default app;
