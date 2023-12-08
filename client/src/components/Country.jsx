import style from './Styles/Country.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCountry } from '../redux/actions'
import React, { useEffect } from 'react'
import Activity from './Activity'

export default function Country(props) {
  const {
    match: {
      params: { id },
    },
  } = props
  const dispatch = useDispatch()
  const country = useSelector((state) => state.country)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    dispatch(getCountry(id))
  }, [])

  useEffect(() => {}, [filter])

  return (
    <div className={style.container}>
      <button className={style.buttonBack} onClick={() => props.history.goBack()}>
        Back
      </button>
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>Details</legend>
        <div className={style.details}>
          <div>
            <h1>{country && country.name?.toUpperCase()}</h1>
            <img src={country.flagImage} className={style.img}></img>
          </div>
          <div className={style.rigth}>
            <section className={style.section}>
              <h4>
                Code: <span className={style.span}>{country.id}</span>
              </h4>
              <h4>
                Capital: <span className={style.span}>{country.capital} </span>
              </h4>
              <h4>
                Continent: <span className={style.span}>{country.continent}</span>
              </h4>
            </section>
            <section className={style.section}>
              <h4>
                Subregion: <span className={style.span}>{country.subregion}</span>
              </h4>
              <h4>
                Population: <span className={style.span}>{country.population}</span>
              </h4>
              <h4>
                Area: <span className={style.span}>{`${country.population} Km²`}</span>
              </h4>
            </section>
          </div>
        </div>
      </fieldset>
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>Activities</legend>
        <div className={style.activities}>
          {country.activities && country.activities.length > 0 ? (
            country.activities.map((e) => {
              return <Activity data={e} key={e.name} />
            })
          ) : (
            <h3>Not Activities Found</h3>
          )}
        </div>
      </fieldset>
    </div>
  )
}
