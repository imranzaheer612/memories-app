import CardBody from "./CardBody"
import CardHeader from "./CardHeader"
import { useRef } from "react"
import { useInViewport } from 'react-in-viewport';
import { useNavigate } from "react-router-dom"
import './card.scss'

/**
 * Card for displaying story data
 * --> images
 * --> title & notes
*/

function Card({images, title, text, date, id}) {
    
    let navigate = useNavigate();
    
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
        navigate(`/story/${id}`)
    }

    /**
     * passing props to child 
    */
    const bodyProps = {
        title : title, 
        text : text, 
        date : date,
    }

    const headerProps = {
        // images : ((images.length && inViewport) ? images : Card.defaultProps.images),
        images : ((images.length ) ? images : Card.defaultProps.images),
    }

    return ( 
        <div ref={myRef} className={'card'} onClick={handleCLick}>
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