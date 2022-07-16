const mongoose = require('mongoose');


const storySchema = new mongoose.Schema(
  {
    title: 
    {
      type: String,
      required: true,
    },
    
    note: String, 
    
    images:
    {
      type: [ String ],
      required: true,
    },

    date: 
    {
      type: String,
      required: true,
    },
  });
  

const Story = mongoose.model('stories', storySchema);
module.exports = Story;