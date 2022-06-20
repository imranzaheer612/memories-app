import './style.scss'


function CardHeader({ image }) {
    
    var style = { 
        backgroundImage: 'url(' + image + ')',
    };

    return (
        <header style={style} id={image} className="card-header">
            <h4 className="card-header--title">story</h4>
        </header>
    )
}


export default CardHeader