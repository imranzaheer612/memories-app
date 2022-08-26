const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A story must have a name'],
      maxlength: [
        40,
        'A story name must have less or equal then 40 characters',
      ],
    },

    note: String,

    images: {
      type: [String],
      required: true,
    },

    date: {
      type: String,
      required: [true, 'Must have a date on which story created.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
// storySchema.virtual('comments', {
//   ref: 'Comment',
//   localField: '_id',
//   foreignField: 'story',
// });

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
