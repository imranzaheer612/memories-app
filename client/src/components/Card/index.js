import { useState } from "react"
import CardBody from "./CardBody"
import CardHeader from "./CardHeader"
import './style.scss'
import React from 'react'



function Card({images, title, text, date}) {

    const [isOpened, setOpened] = useState(false)
   
    const handleCLick = (e) => {
        e.preventDefault();
        setOpened(true);
    }

    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpened(false);
    }

     
    const bodyProps = {
        title : title, 
        text : text, 
        date : date, 
        handleBack : isOpened ? handleBack : void 0, 
        cardOpened : isOpened
    }

    const headerProps = {
        images : (images.length ? images : Card.defaultProps.images),
        cardOpened : isOpened
    }

   
    return (
        <div className={`card ${isOpened ? 'card--clicked' : ''}`} onClick={handleCLick}>
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