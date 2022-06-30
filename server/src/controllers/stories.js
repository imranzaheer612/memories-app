const Story = require('../models/Story')

exports.postStory = async (req, res) => {
    const story = new Story({
        images: req.imageUrls, 
        title: req.body.title, 
        note: req.body.note,
        date : req.body.date.toString()
    });

    await story.save()
    .then((doc) => {
        res.send(doc);
    })
    .catch((err) => {
        console.log("error: " + err);
        res.send(500, {message: 'Failed to save profile'});
    });
};

exports.getStories = async (req, res) => {
    const result = await Story.find().lean();

    let stories = []
    for (let story of result) {
        story.id = story._id.toString()
        delete story._id;

        stories.push(story)
    }
    
    stories.reverse()
    res.send(stories);
};


