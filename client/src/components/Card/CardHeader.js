// import Slideshow from './SlideShow';
import './card.scss'
import { BsFullscreen } from "react-icons/bs";

/**
 * --> header contain images
 * --> also adds a slideshow when clicked
 * --> supports fullscreen
*/

function CardHeader({ images, cardOpened, fullScreenClass, handleFullScreen}) {
    return (
        <div className={`card-header ${fullScreenClass.header}`}>
            {!cardOpened && <img src={images[0]} alt="story"/>}
            {/* {cardOpened && <Slideshow images={images.slice(1)}/>} */}
            <h4 className="card-header--title">story</h4>
            {cardOpened && <BsFullscreen className='icon-fullscreen' size='1.4rem' onClick={handleFullScreen}/>}
        </div>
    )
}


export default CardHeader