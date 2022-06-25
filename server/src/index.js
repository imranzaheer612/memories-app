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
    images : [
      "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    ], 
    title : 'Amazing places',
    note : 'It was such a great place. We stayed at a 5* hotel 😂', 
    date : '20/20/2022' 
  },
];

app.use('/api/images/', express.static('./uploads/images'))

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