import Button from "./Button"
import './card.scss'


function CardBody(props) {

    const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

    return (
        <div className={'card-body'}>
            <p className="date">{props.date}</p>
            <h2>{props.title}</h2>
            <p className="body-content">{truncate(props.text, 100)}</p>
            <Button/>
        </div>
    )
}

export default CardBody
