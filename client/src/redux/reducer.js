import { pagination } from "./actions"
import {GET_ALL_COUNTRIES,
    GET_COUNTRY, 
    ORDER_BY_WORD, 
    FILTER_BY_CONTINENT,
    CREATE_ACTIVITY,
    ADD_ACTIVITY,
    ADD_ID_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    PAGINATION,
    GET_ALL_ACTIVITIES,
    FILTER_BY_ACTIVITY,
    CLEAR_COUNTRY } from "./actionsType"

const inicialState = {
    countries:[],
    countriesFilter:[],
    countries2: [],
    countries3:[],
    country:{},
    filter: false,
    isAddActivity: false,
    activity:{},
    activities:[],
    idCountries:[],
    pagination:1
}

export default function Reducer(state=inicialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                countriesFilter: action.payload,
                countries2: action.payload,
                countries3: action.payload
            }
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload,
                filter: !state.filter
            }
        case GET_COUNTRIES_BY_NAME:
            console.log(action.payload)
            return{
                ...state,
                countriesFilter: action.payload.length>0 ? action.payload : "sin info",
                countries2: action.payload,
                countries3: action.payload,
            }
        case ORDER_BY_WORD:
            let order = []
            if(action.payload === "asc"){
            order = state.countries3.sort(function(a,b){
                if(a.name > b.name) return 1
                else return -1
            })
            }
            else if(action.payload === "desc"){
                order = state.countries3.sort(function(a,b){
                    if(a.name < b.name) return 1
                    else return -1
                })
            }
            else if(action.payload === "min"){
                order = state.countries3.sort(function(a,b){
                    if(a.population > b.population) return 1
                    else return -1
                })
            }else if(action.payload === "max"){
                order = state.countries3.sort(function(a,b){
                    if(a.population < b.population) return 1
                    else return -1
                })
            }else order = state.countriesFilter
            return{
                ...state,
                countriesFilter: order,
                countries2: order,
                filter: !state.filter
            }
        case FILTER_BY_CONTINENT:
            if(action.payload === "All") return {...state,
                countriesFilter: state.countries,
                countries2: state.countries,
                filter: !state.filter
            }
            
            return{
                ...state,
                countriesFilter: state.countries.filter(e => e.continent === action.payload),
                countries2: state.countries.filter(e => e.continent === action.payload),
                pagination:1,
                filter: !state.filter
            }
        case FILTER_BY_ACTIVITY:
            if(action.payload === "All") return {...state, countries2: state.countries}
            let array = []
            state.countries.map(e=>{
                if(e.activities.length>0) e.activities.map(f=> {
                    if(f.name === action.payload) array.push(e)
                })
            })
            return{
                ...state,
                countriesFilter: array,
                filter: !state.filter,
                countries2:array,
                idCountries:[]
            }
            
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                activities: action.payload,
                filter: !state.filter,
            }
        case CREATE_ACTIVITY:
            return{
                ...state,
                activity: action.payload,
                filter: !state.filter,
            }
        case ADD_ACTIVITY:
            return{
                ...state,
                activity:{},
                // filter: !state.filter,
                isAddActivity: !state.isAddActivity
                
                // idCountries: action.payload,
            }
        case ADD_ID_COUNTRIES:
            return{
                ...state,
                idCountries: action.payload,
                filter: !state.filter
            }
        case PAGINATION:
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
                pagination:num
            }
        case CLEAR_COUNTRY: 
            return{
                ...state,
                country: {}
            }
        default:
            return state
    }
}