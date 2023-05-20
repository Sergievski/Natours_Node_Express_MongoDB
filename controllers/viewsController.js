const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tout data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All tours',
    tours: tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The forest hike',
  });
};
