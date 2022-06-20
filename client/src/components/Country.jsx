import { useDispatch, useSelector } from "react-redux"
import { getCountry} from "../redux/actions"
import React, { useEffect } from "react"


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
        <div>
            {console.log(country)}
            <h1>{country && country.name}</h1>
            <img src={country.flagImage}></img>
            <h4>{country.population}</h4>
            <button onClick={()=>props.history.goBack()}>Back</button>
            {/* {console.log(props)} */}
            <div>
                {country.activities && country.activities.map(e=>{
                    return <h4>{e.name}</h4>
                })}
            </div>
        </div>
    )
}