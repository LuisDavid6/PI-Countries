import NavBar from "./NavBar"
import style from "./Styles/Home.module.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { addActivity, getAllCountries, pagination } from "../redux/actions"
import CountryCard from "./CountryCard"
import Filters from "./Filters"
import Pagination from "./Pagination"

export default function Home(){

    const dispatch = useDispatch()
    const countriesFilter = useSelector((state)=> state.countriesFilter)
    const filter = useSelector((state)=> state.filter)
    
    useEffect(()=>{
        dispatch(getAllCountries())
        // console.log("home")
    },[])

    useEffect(()=>{

    },[filter])

    return(
        <div>
            <div className={style.navBar}>
                <NavBar></NavBar>
            </div>
            <div>
                <Filters></Filters>
            </div>
            <div>
                <Pagination></Pagination>
            </div>
            <div className={style.contents}>
                {/* {console.log(a)} */}
                {typeof countriesFilter === "string" ? <h5>Country not found</h5> : 
                 countriesFilter && countriesFilter.slice(0, 9).map(e =>{
                    return (
                        <CountryCard className={style.card} key={e.id} data={e}></CountryCard>
                        )
                    })}
            </div>
        </div>
    )
}