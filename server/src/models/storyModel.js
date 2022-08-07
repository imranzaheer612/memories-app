const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A story must have a name'],
    maxlength: [40, 'A story name must have less or equal then 40 characters'],
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
});

const Story = mongoose.model('stories', storySchema);
module.exports = Story;
