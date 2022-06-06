import style from "./LandingPage.module.css"

export default function Index(){
    return(
        <div className={style.main}>
            <div className={style.title}>
                <h1>HENRY COUNTRIES</h1>
            </div>
            <div className={style.button}>
                <button className={style.enter}>INGRESAR</button>
            </div>
        </div>
    )
}