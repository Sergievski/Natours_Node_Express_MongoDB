const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouts');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

// 1)   GLOBAL  MIDLEWARE

//Set security http headers
app.use(helmet());

// Development loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requiests ftom same IP
const limiter = rateLimit({
  max: 100,
  windowM: 60 * 60 * 1000,
  message: 'Too many requests from this IP , please try again in a hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//  Data sanitization against XSS
app.use(xss());

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  //console.log(req.headers);
  next();
});

// 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
