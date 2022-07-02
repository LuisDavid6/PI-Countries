import style from "./Styles/Footer.module.css"
export default function Footer(){
    return(
        <div className={style.container}>
                <span className={style.text}>Created By Luis David Patiño</span>
                {/* <span>From PI HENRY Bootcamp</span> */}
            <div className={style.images}>
                <a href="#"><img className={style.img} src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img></a>
                <a href="#"><img className={style.img} src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img></a>
            </div>
            <span className={style.text}>From PI HENRY Bootcamp</span>
        </div>
    )
}