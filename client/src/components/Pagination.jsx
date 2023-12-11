import style from './Styles/Pagination.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pagination } from '../redux/actions'

export default function Pagination() {
  const countries2 = useSelector((state) => state.countries2)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const [value, setValue] = useState(1)

  const getPagination = () => {
    const total = countries2.length
    const max = 10
    const nums = Math.ceil(total / max)
    let array = []

    for (let i = 1; i <= nums; i++) {
      array.push(i)
    }
    return array
  }

  let array = getPagination()

  const handleView = (value) => {
    dispatch(pagination(value))
    setValue(value)
  }

  useEffect(() => {}, [filter])

  return (
    <div className={style.container}>
      {array.length > 1 &&
        array.map((e) => {
          return (
            <button className={`${style.button} ${value === e && style.active}`} key={e} value={e} onClick={() => handleView(e)}>
              {e}
            </button>
          )
        })}
    </div>
  )
}
