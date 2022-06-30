import Slideshow from './SlideShow';
import './style.scss'


function CardHeader({ images, cardOpened}) {

    return (
        <header className="card-header">
            {!cardOpened && <img src={images[0]} alt="story"/>}
            {cardOpened && <Slideshow images={images}/>}
            <h4 className="card-header--title">story</h4>
        </header>
    )
}


export default CardHeader