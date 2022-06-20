import Button from "./Button"

import './style.scss'


function CardBody({ title, text }) {
    return (
        <div className="card-body">
            <p className="date">March 20 2015</p>
            
            <h2>{title}</h2>
            
            <p className="body-content">{text}</p>
            
            <Button />
        </div>
    )
}

export default CardBody
