const Story = require('../models/storyModel');
const factory = require('./handlerFactory');

exports.getAllStories = factory.getAll(Story);
exports.getStory = factory.getOne(Story);
exports.createStory = factory.createOne(Story);
exports.updateStory = factory.updateOne(Story);
exports.deleteStory = factory.deleteOne(Story);
