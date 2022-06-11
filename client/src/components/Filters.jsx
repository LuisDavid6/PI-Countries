import React, { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { orderByWord, filterByContinent, orderByPopulation } from "../redux/actions"

export default function Filters(){

    const dispatch = useDispatch()

    const [filter, setFilter] = useState({
        orderByWord: "",
        filterByContinent: "",
        orderByPopulation: ""
    })

    useEffect(()=>{
        dispatch(orderByWord(filter.orderByWord))
        filter.filterByContinent && dispatch(filterByContinent(filter.filterByContinent))
        filter.orderByPopulation && dispatch(orderByPopulation(filter.orderByPopulation))
    },[filter])

    const handleOnChange = (e) => {
        setFilter({...filter, orderByWord: e.target.value})
    }

    const handleOnChangeContinent = (e) =>{
        setFilter({...filter, filterByContinent:e.target.value})
    }

    const handleOnChangePopulation = (e) =>{
        setFilter({...filter, orderByPopulation:e.target.value})
    }

    return(
        <div>
                <select name="order" value={filter.orderByWord} onChange={e => handleOnChange(e)}>
                    <option value="" disabled selected>Ordenar</option>
                    <option value="asc" >A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select name="continents" value={filter.filterByContinent} onChange={(e) => handleOnChangeContinent(e)}>
                    <option value="" disabled selected>Continent</option>
                    <option value="All">View All</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                </select>
                <select name="population" value={filter.orderByPopulation} onChange={(e) => handleOnChangePopulation(e)}>
                    <option value="" disabled selected>population</option>
                    <option value="asc">Min-Max</option>
                    <option value="desc">Max-Min</option>
                </select>
                <button>Actividades</button>
        </div>
    )
}