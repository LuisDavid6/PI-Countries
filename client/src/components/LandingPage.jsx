import { Link } from "react-router-dom"
import style from "./Styles/LandingPage.module.css"

export default function Index(){
    return(
        <div className={style.body}>

        <div className={style.main}>
            <div className={style.title}>
                <h1>HENRY COUNTRIES</h1>
            </div>
            <div className={style.button}>
                <Link to="/home"><button className={style.enter}>INGRESAR</button></Link>
            </div>
        </div>
        </div>
    )
}