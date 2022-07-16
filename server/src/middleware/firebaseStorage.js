const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const storage = require('../config/firebase');

/**
 * Getting img files
 * --> uploading to firebase
 * --> getting download url
 */

const uploadImages = async (req, res, next) => {
    urls = [];
    try {
        for (let file of req.files) {
            const timestamp = Date.now();
            const name = file.originalname.split('.')[0];
            const type = file.originalname.split('.')[1];
            const fileName = `${name}_${timestamp}.${type}`;

            const imageRef = ref(storage, fileName);

            // 'file' comes from the Blob or File API
            await uploadBytes(imageRef, file.buffer).then((snapshot) => {
                console.log('Uploaded a image: ' + file.originalname);
            });

            await getDownloadURL(imageRef, fileName).then((url) => {
                urls.push(url);
            });
        }

        req.imageUrls = urls;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImages
};
