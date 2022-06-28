import axios from 'axios';

const postStory = (postData) => {
    const data = new FormData()

    data.append('title', postData.title)
    data.append('note', postData.note)
    data.append('date', postData.date)

    for (let image of postData.imageFiles) {
        data.append('images', image)
    }

    axios.post("/api/story", data, { 
        // receive two    parameter endpoint url ,form data
    })
    .then(res => {
        console.log(res.statusText)
        console.log(res.data)
    })
    .catch((error) => {
        throw Error(error.message);
    });
    
}


export default postStory;