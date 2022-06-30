const multer = require('multer');


const storage = multer.memoryStorage();
const getImages = multer({ storage: storage }).array('images', 10);

module.exports = getImages;
