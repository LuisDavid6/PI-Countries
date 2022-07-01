import style from "./Styles/NavBar.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getAllCountries, getCountriesByName} from "../redux/actions"

export default function NavBar(){

    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    

    const handleOnChange = (e) =>{
        setSearch(e.target.value)
        dispatch(getCountriesByName(search))
    }
    
    useEffect(()=>{
        if(search !== "") dispatch(getCountriesByName(search))
        else dispatch(getAllCountries())
    },[search])


    const handleOnSubmit = (e) =>{
        e.preventDefault()
        if(search === "") alert("debes ingresar un nombre")
        dispatch(getCountriesByName(search))
    }
    return(
        <div className={style.container}>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={search ? search : null} className={style.input} placeholder="Search" onChange={handleOnChange}></input>
                <button type="submit" className={style.button}>Search</button>
            </form>
            <Link to="/createActivity"> <button className={style.button}>Add Activity</button> </Link>
        </div>
    )
}