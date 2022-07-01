import style from "./Styles/Country.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getCountry} from "../redux/actions"
import React, { useEffect } from "react"
import Activity from "./Activity"
import {Link} from "react-router-dom"


export default function Country(props){
    const {match:{params:{id}}} = props
    const dispatch = useDispatch()
    const country = useSelector(state => state.country)
    const filter = useSelector(state => state.filter)

    useEffect( ()=>{
        dispatch(getCountry(id))
    }, [])

    useEffect( ()=>{
        
    }, [filter])

    return(
        <div className={style.main}>
                <button className={style.buttonBack} onClick={()=>props.history.goBack()}>Back</button>
            <div className={style.container}>
                <fieldset className={style.fieldset}>
                    <legend className={style.legend}>Details</legend>
                    <div className={style.details}>
                        <div className={style.left}>
                            <h1>{country && country.name}</h1>
                            <img src={country.flagImage} className={style.img}></img>
                        </div>
                        <div className={style.rigth}>
                            <h4>Code: {country.id}</h4>
                            <h4>Capital: {country.capital}</h4>
                            <h4>Continent: {country.continent}</h4>
                            <h4>Subregion: {country.subregion}</h4>
                            <h4>Population: {country.population}</h4>
                            <h4>Area: {`${country.population} Km²`}</h4>
                        </div>
                    </div>
                </fieldset>
                <fieldset className={style.fieldset}>
                    <legend className={style.legend}>Activities</legend>
                    <div className={style.activities}>
                        {country.activities && country.activities.length>0 ? country.activities.map(e=>{
                            return <Activity data={e} key={e.name}/>
                        }) : <h3>Not Activities Found</h3> }
                        {/* <Link to="/createActivity"> <button className={style.add}>+</button> </Link> */}
                    </div>
                </fieldset>
            </div>
        </div>
    )
}