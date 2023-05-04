const mongoose = require('mongoose');
const slugify = require('slugify');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review must contain description'],
      maxlength: [300, 'Max length is 300'],
      minlength: [5, 'Min length is 5'],
    },
    rating: {
      type: Number,
      required: [true, 'A must contain a raiting'],
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
      },
    ],
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
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
