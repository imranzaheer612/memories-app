// const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const stories = [
  {
    id : 1, 
    images : [], 
    title : 'sample title',
    note : 'this is a sample note', 
    date : '20/20/2022' 
  }, 
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ],
    text: "Kayaks crowd Three Sister Springsss,Kayaks crowd Three Sister Springsss,Kayaks crowd Three Sister Springsss,Kayaks crowd Three Sister Springsss, where people and manatees maintain controversial coexistence",
    title: "whats up!",
    date: "26 March 2022",
  }, 
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ],
    text: "this is new one",
    title: "whats up!",
    date: "26 March 2022",
  }
];

app.get('/api/story', (req, res) => {
  res.send(stories);
});

app.post('/api/story', (req, res) => {
//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

  const story = {
    id: stories.length + 1,
    images: req.body.images, 
    title: req.body.title, 
    note: req.body.note, 
    date: req.body.date, 
  };

  stories.push(story);
  res.send(story);
});

// app.put('/api/genres/:id', (req, res) => {
//   const genre = stories.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
//   genre.name = req.body.name; 
//   res.send(genre);
// });

// app.delete('/api/genres/:id', (req, res) => {
//   const genre = stories.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   const index = stories.indexOf(genre);
//   stories.splice(index, 1);

//   res.send(genre);
// });

// app.get('/api/genres/:id', (req, res) => {
//   const genre = stories.find(c => c.id === parseInt(req.params.id));
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

// function validateGenre(story) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };

//   return Joi.validate(story, schema);
// }

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));