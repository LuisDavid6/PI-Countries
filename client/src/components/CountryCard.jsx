import style from "./Styles/CountryCard.module.css"
import {Link} from "react-router-dom"
export default function(props){
    return(
        <Link to={`/country/${props.data.id}`}><div className={style.card}>
            <span className={style.name}>{props.data.name}</span>
            <img src={props.data.flagImage} alt="flag"></img>
            <h5>{props.data.population}</h5>
        </div></Link>
    )
}