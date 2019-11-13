import '@babel/polyfill';

import 'app-module-path/register';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './src/routes/index';
import oauthRouter from './src/routes/oauth/oauthController';
import gmailRouter from './src/routes/parser/gmail/gmailController';
import appleRouter from './src/routes/parser/gmail/apple/appleController';
import googleplayRouter from './src/routes/parser/gmail/googleplay/googleplayController';
import testdataRouter from 'src/routes/parser/testdata/testdataController';

const app = express();
const port = 3000;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);
app.use('/gmail', gmailRouter);
app.use('/gmail/apple', appleRouter);
app.use('/gmail/googleplay', googleplayRouter);
app.use('/testdata', testdataRouter);

app.listen(port, () => {
  console.log(`application is listening on port ${port}...`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
