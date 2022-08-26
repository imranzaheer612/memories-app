/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const imageThumbnail = require('image-thumbnail');
const storage = require('../config/firebase');
const catchAsync = require('../utils/catchAsync');

/**
 * Getting img files
 * --> uploading to images to firebase
 * --> making a low quality image as thumbnail then uploading
 * --> getting download urls
 */

const uploadImages = catchAsync(async (req, res, next) => {
  const options = { percentage: 15 };
  const urlsArray = [];
  for (const [index, file] of req.files.entries()) {
    const timestamp = Date.now();

    // create unique imageRef
    const name = file.originalname.split('.')[0];
    const type = file.originalname.split('.')[1];
    const fileName = `${name}_${timestamp}.${type}`;
    const imageRef = ref(storage, fileName);

    // uploading low quality thumbnail image
    if (index === 0) {
      const thumbnailName = `thumbnail_${fileName}`;
      const thumbnailRef = ref(storage, thumbnailName);
      const thumbnailBuffer = await imageThumbnail(file.buffer, options);
      await uploadImage(
        thumbnailRef,
        thumbnailBuffer,
        thumbnailName,
        urlsArray
      );
    }

    await uploadImage(imageRef, file.buffer, fileName, urlsArray);
  }

  req.body.images = urlsArray;
  next();
});

const uploadImage = async (imageRef, buffer, fileName, urlsArray) => {
  // 'file' comes from the Blob or File API
  await uploadBytes(imageRef, buffer).then((snapshot) => {
    console.log(`Uploaded image: ${fileName}`);
  });

  await getDownloadURL(imageRef, fileName).then((url) => {
    urlsArray.push(url);
  });
};

module.exports = {
  uploadImages,
};
