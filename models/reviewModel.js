const mongoose = require('mongoose');
// const slugify = require('slugify');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review must contain description'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true,
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to user.'],
      },
    ],
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//document middleware :  runs before the .save() and .create()
// reviewSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// QUERY MIDDLEWARE :

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
  });
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
