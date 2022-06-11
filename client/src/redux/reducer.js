import {GET_ALL_COUNTRIES,
        GET_COUNTRY, 
        ORDER_BY_WORD, 
        FILTER_BY_CONTINENT, 
        ORDER_BY_POPULATION} from "./actionsType"

const inicialState = {
    countries:[],
    countriesFilter:[],
    country:{},
    filter: false
}

export default function Reducer(state=inicialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                countriesFilter: action.payload
            }
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload
            }
        case ORDER_BY_WORD:
            let filt = []
            if(action.payload === "asc"){
               filt = state.countries.sort(function(a,b){
                   if(a.name > b.name) return 1
                   else return -1
               })
            }
            else if(action.payload === "desc"){
                filt = state.countries.sort(function(a,b){
                    if(a.name < b.name) return 1
                    else return -1
                })
            }
            else filt = state.countries
            
            return{
                ...state,
                countriesFilter: filt,
                filter: !state.filter
               }
        case FILTER_BY_CONTINENT:
            if(action.payload === "All") return state
            return{
                ...state,
                countriesFilter: state.countries.filter(e => e.continent === action.payload),
                filter: !state.filter
            }
        case ORDER_BY_POPULATION:
            let order = []
            if(action.payload === "asc"){
                order = state.countriesFilter.sort(function(a,b){
                    if(a.population > b.population) return 1
                    else return -1
                })
            }else if(action.payload === "desc"){
                order = state.countriesFilter.sort(function(a,b){
                    if(a.population < b.population) return 1
                    else return -1
                })
            }else order = state.countries

            return{
                ...state,
                countriesFilter: order,
                filter: !state.filter
            }
        default:
            return state
    }
}