import Slideshow from './SlideShow';
import './style.scss'


function CardHeader({ images, cardOpened}) {

    
    let imagesURL = images;
    
    var style = { 
        backgroundImage: 'url(' + imagesURL[0] + ')',
    };

    return (
        <header style={!cardOpened ? style : null} className="card-header">
            {cardOpened && <Slideshow images={imagesURL}/>}
            <h4 className="card-header--title">story</h4>
        </header>
    )
}


export default CardHeader