import style from './Styles/CountryCard.module.css'
import { Link } from 'react-router-dom'

export default function CountryCard(props) {
  return (
    <div className={style.container}>
      <Link to={`/country/${props.data.id}`} className={style.link}>
        <div className={style.card}>
          <span className={`${style.span} ${style.name}`}>{props.data.name}</span>
          <img src={props.data.flagImage} alt='flag'></img>
          <span className={style.span}>
            <b>Continent: </b>
            {props.data.continent}
          </span>
          <span className={style.span}>
            <b>Population: </b>
            {props.data.population}
          </span>
        </div>
      </Link>
    </div>
  )
}
