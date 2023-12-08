import style from './Styles/Activity.module.css'

export default function Activity(props) {
  return (
    <div className={style.container}>
      <h4>
        <b>{props.data.name.toUpperCase()}</b>
      </h4>
      <section className={style.info}>
        <h5>Difficulty: {props.data.difficulty}</h5>
        <h5>Duration: {props.data.duration} hrs</h5>
        <h5>Season: {props.data.season}</h5>
      </section>
    </div>
  )
}
