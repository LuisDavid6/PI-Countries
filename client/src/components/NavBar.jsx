import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { getCountriesByName,filterByContinent} from "../redux/actions"

export default function NavBar(){

    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    

    const handleOnChange = (e) =>{
        setSearch(e.target.value)
        dispatch(getCountriesByName(search))
    }
    
    useEffect(()=>{
        dispatch(getCountriesByName(search))
    },[search])

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        if(search === "") alert("debes ingresar un nombre")
        dispatch(getCountriesByName(search))
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Search" onChange={handleOnChange}></input>
                <button type="submit">Search</button>
            </form>
            <Link to="/createActivity"> <button>Add Activity</button> </Link>
        </div>
    )
}