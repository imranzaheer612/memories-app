const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storiesController');
const { uploadImages } = require('../middleware/firebaseStorage');
const getImages = require('../middleware/multer');

router
    .route('/')
    .get(storyController.getAllStories)
    .post([getImages, uploadImages], storyController.createStory);

router
    .route('/:id')
    .get(storyController.getStory)
    .delete(storyController.deleteStory);
    // .patch(tourController.updateTour)
  

module.exports = router;
