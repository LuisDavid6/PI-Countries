import style from './Styles/NavBar.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCountriesByName } from '../redux/actions'

export default function NavBar() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (search === '') alert('You must enter a name')
    dispatch(getCountriesByName(search))
  }
  return (
    <div className={style.container}>
      <form onSubmit={handleOnSubmit}>
        <section className={style.section}>
          <input
            type='text'
            value={search ? search : null}
            className={style.input}
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <i className={`${style.icono} bx bx-search }`} style={{ color: 'aliceblue' }} onClick={handleOnSubmit}></i>
        </section>
      </form>
      <Link to='/createActivity'>
        <button className={style.button}>Add Activity</button>
      </Link>
    </div>
  )
}
