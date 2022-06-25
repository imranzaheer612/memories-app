import Slideshow from './SlideShow';
import './style.scss'


function CardHeader({ images, cardOpened}) {

    
    let imagesURL = images;
    
    if (images[0].filename) {
        imagesURL = [];
        
        for (let url of images) {
            imagesURL.push('/api/images/' + url.filename)
        }
    }

    return (
        <header className="card-header">
            {!cardOpened && <img src={imagesURL[0]} alt="story"/>}
            {cardOpened && <Slideshow images={imagesURL}/>}
            <h4 className="card-header--title">story</h4>
        </header>
    )
}


export default CardHeader