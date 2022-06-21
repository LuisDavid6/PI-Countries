import style from "./Styles/Filters.module.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { orderByWord, filterByContinent, filterByActivity, getAllActivities } from "../redux/actions"

export default function Filters(){

    const dispatch = useDispatch()
    const activities = useSelector((state)=> state.activities)
    const activity = useSelector((state)=> state.activity)
    const idCountries = useSelector((state)=> state.idCountries)

    const [filter, setFilter] = useState({
        orderBy: "",
        filterByContinent: "",
        orderByPopulation: "",
        filterByActivity: "",
    })

    useEffect(()=>{
        dispatch(getAllActivities())
        filter.orderBy && dispatch(orderByWord(filter.orderBy))
        filter.filterByContinent && dispatch(filterByContinent(filter.filterByContinent))
        filter.filterByActivity && dispatch(filterByActivity(filter.filterByActivity))
    },[filter])

    const handleOnChange = (e) => {
        setFilter({...filter, orderBy: e.target.value})
    }

    const handleOnChangeContinent = (e) =>{
        setFilter({...filter, filterByContinent: e.target.value})
    }

    const handleOnChangeActivity = (e) =>{
        setFilter({...filter, filterByActivity:e.target.value})
    }

    return(
        <div className={style.container}>
            <fieldset className={style.fieldset}>
                <legend className={style.legend}>ORDER BY:</legend>
                <select name="order" className={style.select} value={filter.orderBy} onChange={e => handleOnChange(e)}>
                    <option value="" disabled selected>Default</option>x
                    <option value="asc" >By name A-Z</option>
                    <option value="desc">By name Z-A</option>
                    <option value="min">By Population (-/+)</option>
                    <option value="max">By Population (+/-)</option>
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
            <select name="activities" className={style.select} value={filter.filterByActivity} onChange={(e) => handleOnChangeActivity(e)}>
                    <option value="All">View All</option>
                    {activities && activities.map(e=>{
                        return <option key={e.id} value={e.name}>{e.name}</option>
                    })}
                </select>
            </fieldset> 
        </div>
    )
}