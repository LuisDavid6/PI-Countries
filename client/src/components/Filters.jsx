import style from "./Styles/Filters.module.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { orderByWord, filterByContinent } from "../redux/actions"

export default function Filters(){

    const dispatch = useDispatch()

    const [filter, setFilter] = useState({
        orderBy: "",
        filterByContinent: "",
        orderByPopulation: ""
    })

    useEffect(()=>{
        dispatch(orderByWord(filter.orderBy))
        filter.filterByContinent && dispatch(filterByContinent(filter.filterByContinent))
    },[filter])

    const handleOnChange = (e) => {
        setFilter({...filter, orderBy: e.target.value})
    }

    const handleOnChangeContinent = (e) =>{
        setFilter({...filter, filterByContinent:e.target.value})
    }

    return(
        <div className={style.container}>
            <fieldset className={style.fieldset}>
                <legend className={style.legend}>ORDER BY:</legend>
                <select name="order" className={style.select} value={filter.orderBy} onChange={e => handleOnChange(e)}>
                    <option value="none" selected>Default</option>
                    <option value="asc" >Asc A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="min">Min-Max</option>
                    <option value="max">Max-Min</option>
                    {/* <option value="none">None</option> */}
                </select>
            </fieldset>
            <fieldset className={style.fieldset}>
                <legend className={style.legend}>CONTINENT</legend>
                <select name="continents" className={style.select} value={filter.filterByContinent} onChange={(e) => handleOnChangeContinent(e)}>
                    <option value="All">View All</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                </select>
            </fieldset>  
            <fieldset className={style.fieldset}>
            <legend className={style.legend}>ACTIVITIES</legend>
            <select name="activities" className={style.select}>
                    <option value="asc">View All</option>
                </select>
            </fieldset> 
        </div>
    )
}