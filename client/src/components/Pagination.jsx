import style from "./Styles/Pagination.module.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries, pagination } from "../redux/actions"

export default function Pagination(){

    const countries2 = useSelector(state => state.countries2) 
    // const countriesFilter = useSelector(state => state.countriesFilter)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const getPagination = ()=>{
        const total = countries2.length
        const max = 10
        const nums = Math.ceil(total/max)
        let array = []
    
        for (let i = 1; i <= nums; i++) {
            array.push(i)
        }
        return array
    }

    let array = getPagination()

    const handleView = (e)=>{
        const value = e.target.value
        dispatch(pagination(value))
    }

    useEffect( () =>{
    }, [filter])

    return(
        <div className={style.container}>
            {array.length>0 && array.map(e=>{
                return <button className={style.button} key={e} value={e} onClick={(e) => handleView(e)}>{e}</button>
            })}
        </div>
    )
}