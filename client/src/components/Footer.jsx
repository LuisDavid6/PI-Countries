import style from './Styles/Footer.module.css'

export default function Footer() {
  return (
    <div className={style.container}>
      <span className={style.text}>Created By Luis David Patiño</span>
      <div className={style.images}>
        <a href='https://www.linkedin.com/in/luis-david-pati%C3%B1o-09500a215' target='_blank' rel='noreferrer'>
          <img className={style.img} src='https://cdn-icons-png.flaticon.com/512/174/174857.png' alt=''></img>
        </a>
        <a href='https://github.com/LuisDavid6' target='_blank' rel='noreferrer'>
          <img className={style.img} src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt=''></img>
        </a>
      </div>
      <span className={style.text}>To HENRY Bootcamp</span>
    </div>
  )
}
