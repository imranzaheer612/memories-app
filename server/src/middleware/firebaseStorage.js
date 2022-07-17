const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const storage = require('../config/firebase');
const imageThumbnail = require('image-thumbnail');

/**
 * Getting img files
 * --> uploading to images to firebase
 * --> making a low quality image as thumbnail then uploading
 * --> getting download urls
 */

const uploadImages = async (req, res, next) => {
    let options = { percentage: 15 };
    let urls_array = [];
    try {
        for (let [index, file] of req.files.entries()) {
            const timestamp = Date.now();

            // create unique imageRef
            let name = file.originalname.split('.')[0];
            let type = file.originalname.split('.')[1];
            let file_name = `${name}_${timestamp}.${type}`;
            let imageRef = ref(storage, file_name);

            // uploading low quality thumbnail image
            if (index === 0) {
                let thumbnail_name = `thumbnail_${file_name}`;
                let thumbnailRef = ref(storage, thumbnail_name);
                const thumbnail_buffer = await imageThumbnail(file.buffer, options);
                await uploadImage(thumbnailRef, thumbnail_buffer, thumbnail_name, urls_array);
            }

            await uploadImage(imageRef, file.buffer, file_name, urls_array);
        }
        
        req.imageUrls = urls_array;
        next();
    } 
    catch (error) {
        next(error);
    }
};

const uploadImage = async (imageRef, buffer, file_name, urls_array) => {
    // 'file' comes from the Blob or File API
    await uploadBytes(imageRef, buffer).then((snapshot) => {
        console.log('Uploaded image: ' + file_name);
    });

    await getDownloadURL(imageRef, file_name).then((url) => {
        urls_array.push(url);
    });
};

module.exports = {
    uploadImages
};
