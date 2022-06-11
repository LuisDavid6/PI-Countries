import NavBar from "./NavBar"
import style from "./Styles/Home.module.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getAllCountries } from "../redux/actions"
import CountryCard from "./CountryCard"
import Filters from "./Filters"

export default function Home(){

    const dispatch = useDispatch()

    // const countries = useSelector((state)=> state.countries)
    const countriesFilter = useSelector((state)=> state.countriesFilter)
    const filter = useSelector((state)=> state.filter)

    useEffect(()=>{
        dispatch(getAllCountries())
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
            <div className={style.contents}>
                {/* {console.log(countriesFilter)} */}
                { countriesFilter && countriesFilter.map(e =>{
                    return (
                        <CountryCard key={e.id} data={e}></CountryCard>
                        )
                    })}
            </div>
        </div>
    )
}