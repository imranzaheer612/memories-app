import axios from 'axios';

const postStory = async (postData) => {
    const data = new FormData()

    data.append('title', postData.title)
    data.append('note', postData.note)
    data.append('date', postData.date)
    
    for (let image of postData.imageFiles) {
        data.append('images', image)
    }

    try {
        return await axios.post("/api/story", data, {})
    }
    catch (e) {
        throw new Error(e);
    }
}


export default postStory;