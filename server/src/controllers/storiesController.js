const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Story = require('../models/Story')

exports.createStory = async (req, res) => {
    const story = new Story({
        images: req.imageUrls, 
        title: req.body.title, 
        note: req.body.note,
        date : req.body.date
    });

    const newStory = await story.save();

    res.status(201).json({
      status: 'success',
      data: {
        story: newStory
      }
    });
};

exports.getAllStories = catchAsync(async (req, res) => {
    const features = new APIFeatures(Story.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const stories = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: stories.length,
        data: {
            stories
        }
    });
  });

  /**
   * Get a single story based on ID
  */
  exports.getStory = catchAsync(async (req, res, next) => {
    const story = await Story.findById(req.params.id);
  
    if (!story) return next(new AppError('No story found with that ID', 404));
  
    res.status(200).json({
      status: 'success',
      data: {
        story: story
      }
    });
  });

  exports.deleteStory = catchAsync(async (req, res, next) => {
    const story = await Story.findByIdAndDelete(req.params.id);
  
    if (!story) {
      return next(new AppError('No story found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  