import CardBody from "./CardBody"
import CardHeader from "./CardHeader"
import './style.scss'


function Card() {
    return (
        <div className="card">
            <CardHeader image={'https://source.unsplash.com/user/erondu/600x400'}/>
            <CardBody title={'What happened in Thailand?'} text={'Kayaks crowd Three Sister Springs, where people and manatees maintain controversial coexistence'}/>
        </div>
    )
}

export default Card