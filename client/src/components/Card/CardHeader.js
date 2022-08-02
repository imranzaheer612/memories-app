import './card.scss'

/**
 * --> header contain thumbnail
*/

function CardHeader({ images }) {
    return (
        <div className={'card-header'}>
            <img src={images[0]} alt="story"/>
            <h4 className="card-header--title">story</h4>
        </div>
    )
}


export default CardHeader