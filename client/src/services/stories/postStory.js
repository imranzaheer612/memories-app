import axios from 'axios';

const postStory = (postData) => {
    const data = new FormData()

    data.append('title', postData.title)
    data.append('note', postData.note)
    data.append('date', postData.date)
    // data.append('images', postData.imageFiles)

    for (let image of postData.imageFiles) {
        data.append('images', image)
    }

    axios.post("/api/story", data, { 
        // receive two    parameter endpoint url ,form data
    })
    
    .then(res => { // then print response status
        console.log(res.statusText)
     })
}


export default postStory;




// async function postStory(formData) {
//     try 
//     {
//       let res = await fetch("/api/story", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             images : formData.imageFiles[0], 
//             title : formData.title, 
//             note : formData.note, 
//             date : formData.date, 
//         }),
//       });

//       let resJson = await res.json();
//       if (res.status === 200) {
//         console.log('posted successfully');
//       } else {
//         console.log(("Some error occurred"));;
//       }
//     } catch (err) {
//       console.log(err);
//     }

// };

// export default postStory;