const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const storyController = require('../controllers/storyController');
const { uploadImages } = require('../middleware/firebaseStorage');
const getImages = require('../middleware/multer');

router
  .route('/')
  .get(storyController.getAllStories)
  .post(
    authController.protect,
    [getImages, uploadImages],
    storyController.createStory
  );

router
  .route('/:id')
  .get(storyController.getStory)
  .delete(storyController.deleteStory);
// .patch(tourController.updateTour)

module.exports = router;
