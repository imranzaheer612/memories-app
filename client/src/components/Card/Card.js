import { useState, useRef } from "react"
import CardBody from "./CardBody"
import CardHeader from "./CardHeader"
import './card.scss'
import { useInViewport } from 'react-in-viewport';
import { useNavigate } from "react-router-dom"

/**
 * Card for displaying story data
 * --> images
 * --> title & notes
*/

function Card({images, title, text, date}) {
    
    let navigate = useNavigate();
    let default_classes = {header: "card-header", body: ""};
    const [isOpened, setOpened] = useState(false)
    const [fullScreenClass, setFullScreenClass] = useState(default_classes);
    
    /**
     * viewport configuration for viewport rendering
     * only specific cards images will be rendered
    */
    const myRef = useRef();
    let config = {};
    const {
        inViewport,
        enterCount,
        leaveCount,
     } = useInViewport(myRef, config = { disconnectOnLeave: false },);

   
    const handleCLick = (e) => {
        e.preventDefault();
        navigate('/story')
    }

    /**
     * when fullscreen icon click
     * header & body classes changes as "fullScreenClass"
    */
    const handleFullScreen = (e) => {
        if (fullScreenClass.header === default_classes.header) {
            setFullScreenClass({header: 'card-header__fullscreen', body: 'card-body__fullscreen'})
        }
        else {
            setFullScreenClass(default_classes);
        }
        console.log(fullScreenClass)
    }

    /**
     * handler for going back
    */
    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpened(false);
    }

    /**
     * passing props to child 
    */
    const bodyProps = {
        title : title, 
        text : text, 
        date : date, 
        handleBack : isOpened ? handleBack : void 0, 
        cardOpened : isOpened, 
        fullScreenClass: fullScreenClass
    }

    const headerProps = {
        images : ((images.length && inViewport) ? images : Card.defaultProps.images),
        cardOpened : isOpened, 
        handleFullScreen: handleFullScreen, 
        fullScreenClass: fullScreenClass

    }

    return ( 
        <div ref={myRef} className={`card ${isOpened ? 'card--clicked' : ''}`} onClick={handleCLick}>
            <CardHeader {...headerProps} />
            <CardBody {...bodyProps}/>  
        </div>
    )
}


Card.defaultProps = {
    images : ['https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'], 
    title : 'No Title Found!', 
    text : 'no text found!', 
    date : "null"
}

export default Card