import { Link } from "react-router-dom"
import style from "./Styles/LandingPage.module.css"

export default function Index(){
    return(
        <div className={style.body}>
                <Link to="/home"><button className={style.enter}>INGRESAR</button></Link>
        </div>
    )
}