// review / rating / createdAt / ref to tour / ref to user

const mongoose = require('mongoose');
// const Story = require('./storyModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    story: {
      type: mongoose.Schema.ObjectId,
      ref: 'Story',
      required: [true, 'Comment must belong to a post.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    parentComment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      required: [false],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Before showing comment populate the child References
 */
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'story',
    select: 'title',
  })
    .populate({
      path: 'user',
      select: 'name',
    })
    .populate({
      path: 'user',
      select: 'name',
    });

  next();
});

// Virtual populate
commentSchema.virtual('reply', {
  ref: 'Comment',
  foreignField: 'parentComment',
  localField: '_id',
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'reply',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
