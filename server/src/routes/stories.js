const express = require('express');
const router = express.Router();

const { postStory, getStories } = require('../controllers/stories');
const { uploadImages } = require('../middleware/firebaseStorage');
const getImages = require('../middleware/multer');

router
    .route('/')
    .get(getStories)
    .post([getImages, uploadImages], postStory);

module.exports = router;
