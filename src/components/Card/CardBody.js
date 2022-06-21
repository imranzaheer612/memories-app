import Button from "./Button"

import './style.scss'


function CardBody(props) {
    return (
        <div className="card-body">
            <p className="date">{props.date}</p>
            <h2>{props.title}</h2>
            <p className="body-content">{props.text}</p>
            <Button handleBack={props.handleBack} />
        </div>
    )
}

export default CardBody
