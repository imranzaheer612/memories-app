const express =  require('express')
const router = express.Router();
const multer = require('multer');
const Story = require('../models/Story');


router.get('/', async (req, res) => {
    const result = await Story.find().lean();

    let stories = []
    for (let story of result) {
        story.id = story._id.toString()
        delete story._id;

        story.images = JSON.parse(story.images)
        stories.push(story)
    }
    
    stories.reverse()
    res.send(stories);
});


/**
 * multer to save uploaded images to local storage
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
  })

const upload = multer({ storage: storage }).array('images', 10);


router.post('/', upload, async (req, res) => {
    const story = new Story({
        images: JSON.stringify(req.files), 
        title: req.body.title, 
        note: req.body.note,
        date : req.body.date.toString()
    });

    await story.save().
    then((doc) => {
      res.send(doc);
    }).catch((err) => {
      console.log("eroror: " + err);
      res.send(500, {message: 'Failed to save profile'});
    });
});


module.exports = router;