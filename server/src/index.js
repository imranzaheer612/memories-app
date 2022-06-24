const express = require('express');
const app = express();
const multer = require('multer');


app.use(express.json());


/**
 * multer to save uploaded images to local storage
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).array('images', 10);

/**
 * sample stories data
*/
const stories = [
  {
    id : 1, 
    images : [], 
    title : 'sample title',
    note : 'this is a sample note', 
    date : '20/20/2022' 
  },
];

app.get('/api/story', (req, res) => {
  res.send(stories);
});

app.post('/api/story', upload, (req, res) => {

  const story = {
    id: stories.length + 1,
    images: req.files, 
    title: req.body.title, 
    note: req.body.note, 
    date: req.body.date, 
  };

  stories.push(story);
  res.send(story);

  console.log('data pushed: ');
  console.log(stories);
});

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));