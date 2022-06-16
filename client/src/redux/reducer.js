import {GET_ALL_COUNTRIES,
    GET_COUNTRY, 
    ORDER_BY_WORD, 
    FILTER_BY_CONTINENT,
    CREATE_ACTIVITY,
    ADD_ACTIVITY,
    ADD_ID_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    PAGINATION } from "./actionsType"

const inicialState = {
countries:[],
countriesFilter:[],
countries2 : [],
country:{},
filter: false,
activity:{},
idCountries:[],
}

export default function Reducer(state=inicialState, action){
switch(action.type){
    case GET_ALL_COUNTRIES:
        return{
            ...state,
            countries: action.payload,
            countriesFilter: action.payload,
            countries2: action.payload
        }
    case GET_COUNTRY:
        return{
            ...state,
            country: action.payload
        }
    case GET_COUNTRIES_BY_NAME:
        return{
            ...state,
            countriesFilter: action.payload.length>0 ? action.payload : "sin info",
            countries2: action.payload
        }
    case ORDER_BY_WORD:
        let order = []
        if(action.payload === "asc"){
           order = state.countries.sort(function(a,b){
               if(a.name > b.name) return 1
               else return -1
           })
        }
        else if(action.payload === "desc"){
            order = state.countries.sort(function(a,b){
                if(a.name < b.name) return 1
                else return -1
            })
        }
        else if(action.payload === "min"){
            order = state.countries.sort(function(a,b){
                if(a.population > b.population) return 1
                else return -1
            })
        }else if(action.payload === "max"){
            order = state.countries.sort(function(a,b){
                if(a.population < b.population) return 1
                else return -1
            })
        }else order = state.countries

        return{
            ...state,
            countriesFilter: order,
            filter: !state.filter
        }
    case FILTER_BY_CONTINENT:
        if(action.payload === "All") return {...state, countries2: state.countries}
        
        return{
            ...state,
            countriesFilter: state.countries.filter(e => e.continent === action.payload),
            filter: !state.filter,
            countries2: state.countries.filter(e => e.continent === action.payload)
        }
    case CREATE_ACTIVITY:
        return{
            ...state,
            activity: action.payload
        }
    case ADD_ACTIVITY:
        return{
            state
        }
    case ADD_ID_COUNTRIES:
        return{
            ...state,
            idCountries: action.payload
        }
    case PAGINATION: {
        let num = parseInt(action.payload)
        let countriesviews = []
        if(num === 1){
            countriesviews = state.countries2.slice(num-1, num+8)
        }
        else {
            countriesviews = state.countries2.slice((num-1)*(10), (((num-1)*(10))+(10)))
        }
        // console.log(countriesviews)
        return{
            ...state,
            countriesFilter: countriesviews,
            filter: !state.filter,
        }
    }
    default:
        return state
}
}