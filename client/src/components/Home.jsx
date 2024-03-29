import NavBar from './NavBar'
import style from './Styles/Home.module.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addActivity, clearCountry, getAllCountries } from '../redux/actions'
import CountryCard from './CountryCard'
import Filters from './Filters'
import Pagination from './Pagination'
import Footer from './Footer'

export default function Home() {
  const dispatch = useDispatch()
  const countriesFilter = useSelector((state) => state.countriesFilter)
  const filter = useSelector((state) => state.filter)
  const pagination = useSelector((state) => state.pagination)

  const idCountries = useSelector((state) => state.idCountries)
  const isAddActivity = useSelector((state) => state.isAddActivity)
  const activity = useSelector((state) => state.activity)

  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(clearCountry())
  }, [])

  useEffect(() => {
    activity.id && idCountries && dispatch(addActivity(activity.id, idCountries))
  }, [filter])

  useEffect(() => {
    dispatch(getAllCountries())
  }, [isAddActivity])

  let pag = pagination
  pagination === 1 ? (pag = 9) : (pag = 10)

  return (
    <div className={style.container}>
      <div className={style.header}>
        <NavBar></NavBar>
      </div>
      <div>
        <Filters></Filters>
      </div>

      <div className={style.contents}>
        {typeof countriesFilter === 'string' ? (
          <h5 className={style.notFound}>Country not found</h5>
        ) : countriesFilter && countriesFilter.length > 0 ? (
          countriesFilter.slice(0, pag).map((e) => {
            return <CountryCard className={style.card} key={e.id} data={e}></CountryCard>
          })
        ) : (
          <div className={style.spinnerContainer}>
            <div className={style.spinner}></div>
          </div>
        )}
      </div>

      <Pagination></Pagination>

      <div className={style.footer}> {countriesFilter.length > 0 ? <Footer></Footer> : null}</div>
    </div>
  )
}
