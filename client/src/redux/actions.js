import {GET_ALL_COUNTRIES, GET_COUNTRY, ORDER_BY_WORD, FILTER_BY_CONTINENT, ORDER_BY_POPULATION}from "./actionsType"

const url = "http://localhost:3001"

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

export function orderByPopulation(order){
    return{
        type: ORDER_BY_POPULATION,
        payload: order
    }
}
