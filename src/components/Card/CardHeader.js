import Slideshow from './SlideShow';
import './style.scss'


function CardHeader({ images, cardOpened}) {
    
    var style = { 
        backgroundImage: 'url(' + images[0] + ')',
    };

    return (
        <header style={!cardOpened ? style : null} className="card-header">
            {cardOpened && <Slideshow images={images}/>}
            <h4 className="card-header--title">story</h4>
        </header>
    )
}


export default CardHeader