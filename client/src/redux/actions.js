import {GET_ALL_COUNTRIES, GET_COUNTRY,
         ORDER_BY_WORD, FILTER_BY_CONTINENT,
         CREATE_ACTIVITY, ADD_ACTIVITY, ADD_ID_COUNTRIES, 
         GET_COUNTRIES_BY_NAME, PAGINATION, GET_ALL_ACTIVITIES, 
         FILTER_BY_ACTIVITY, CLEAR_COUNTRY}from "./actionsType"

// const url = "http://localhost:3001"
const url = process.env.REACT_APP_URL


export function getAllCountries(){    
    return function(dispatch){
        return fetch(url+"/countries")
            .then(data => data.json())
            .then( json =>{
                dispatch({ type:GET_ALL_COUNTRIES, payload: json })
            })
            .catch(error => console.log(error))
    }
}

export function getCountry(id){
    return function(dispatch){
        return fetch(`${url}/countries/${id}`)
            .then(data => data.json())
            .then(json =>{
                dispatch({ type: GET_COUNTRY, payload: json})
            })
            .catch(error => console.log(error))
    }
}

export function getCountriesByName(name){
    return function(dispatch){
        return fetch(`${url}/countries?name=${name}`)
            .then(data => data.json())
            .then(json =>{
                dispatch({type: GET_COUNTRIES_BY_NAME, payload: json })
            })
            .catch(error => console.log(error))
    }
}

export function orderByWord(order){
    return{
        type: ORDER_BY_WORD,
        payload: order
    }
}

export function filterByContinent(continent){
    return{
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}

export function filterByActivity(activity){
    return{
        type: FILTER_BY_ACTIVITY,
        payload: activity
    }
}

export function addIdCountries(countries){
    return{
        type: ADD_ID_COUNTRIES,
        payload: countries
    }
}


export function createActivity(activity, countries){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return function (dispatch){
        return fetch(url+'/activities/', requestOptions)
        .then(data => data.json())
        .then(json => {
            dispatch({ type: CREATE_ACTIVITY, payload: json})
        })
        .catch(err => console.log(err))
    }
}

export function addActivity(idActivity, idCountry){
    console.log(idActivity,idCountry)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({idActivity,idCountry})
    };

    return function (dispatch){
        return fetch(url+'/activities/addActivity', requestOptions)
            .then(data => data.json())
            .then(json => {
                console.log(json)
                dispatch({ type: ADD_ACTIVITY, payload: json })
            })
            .catch(err => console.log(err))
    }
}

export function getAllActivities(){
    return function(dispatch){
        return fetch(`${url}/activities/activities`)
            .then(data => data.json())
            .then(json =>{
                dispatch({type: GET_ALL_ACTIVITIES, payload: json })
            })
            .catch(error => console.log(error))
    }
}

export function pagination(numPag){
    return{
        type: PAGINATION,
        payload: numPag
    }
}

export function clearCountry(){
    return{
        type: CLEAR_COUNTRY
    }
}
