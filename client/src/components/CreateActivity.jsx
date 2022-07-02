import style from "./Styles/CreateActivity.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useState, useEffect } from "react"
import {getAllCountries, createActivity, addIdCountries } from "../redux/actions"
import { validate } from "../Validations/index"

export default function CreateActivity(props){

    const [form, setForm] = useState({
        name:"",
        difficulty: "1",
        duration: 0,
        season:"summer",
        country:[]
    })

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: ""
    })

    const [countryState, setCountryState] = useState([])
    const countries = useSelector(state => state.countries)

    const dispatch = useDispatch()
    
    const handleOnChange = (e) =>{
        setForm({...form,
            [e.target.name] : e.target.value})
        
        let name = validate({[e.target.name] : e.target.value})
        setErrors({...errors, [e.target.name]: name})

    }

    const handleCountry = (e) =>{
        let value = e.target.value
        if(value){
            let id = countries.find(e => e.name===value).id
            if(countryState.includes(id)) alert("el country ya esta agregado")
            else{
                setErrors({...errors, countries:""})
                setCountryState([...countryState, id])
                setForm({...form, country:[...form.country, e.target.value]})
            }
        }
    }

    const handleDuration = (value) =>{
        let val = validate({duration:form.duration+value})
        if(val) setErrors({...errors, duration:val})
        else {
            setErrors({...errors, duration:""})
            setForm({...form,duration:form.duration+value})
        }
    }


    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const value = {
            name: form.name,
            difficulty: form.difficulty,
            duration: ""+form.duration,
            season: form.season 
        }

        if(!errors.name && !errors.difficulty && 
        !errors.season){
            if(value.name.length === 0) setErrors({...errors, name:"El nombre no puede estar vacio"})
            else if(form.duration=== 0) setErrors({...errors, duration:"La duración debe ser mayor a 0"})
            else if(form.country.length === 0) setErrors({...errors, countries:"Debes seleccionar al menos un pais"})
            else{
                dispatch(createActivity(value, countryState))
                dispatch(addIdCountries(countryState))
                alert("Agregado"); 
                props.history.goBack()
            }

        }
    }
     
    useEffect(() =>{
        dispatch(getAllCountries())
    },[])
 
    return(
        <div className={style.main}>
            <h1>NEW ACTIVITY</h1>
            <button className={style.buttonBack} onClick={()=>props.history.goBack()}>Back</button>
        <div>
            <fieldset className={style.fieldset}>
                <legend className={style.legend}>New Activity</legend>
                <form className={style.form} onSubmit={handleOnSubmit} autoComplete="off">

                    <div>
                        <label>Name: </label><br/><br/>
                        <input type="text" name="name" onChange={handleOnChange} className={`${style.name} ${errors.name && style.danger}`}></input>
                        {errors.name ?<p className={style.error}>{errors.name}</p>: null}
                    </div>
                    <div>
                        <label>Difficulty: </label><br/><br/>
                        
                        <input type="radio" id="1" name="difficulty" value="1" defaultChecked onChange={handleOnChange}></input>
                        <label for="1">1</label>
                        <input type="radio" id="2" name="difficulty" value="2" onChange={handleOnChange}></input>
                        <label for="2">2</label>
                        <input type="radio" id="3" name="difficulty" value="3" onChange={handleOnChange}></input>
                        <label for="3">3</label>
                        <input type="radio" id="4" name="difficulty" value="4" onChange={handleOnChange}></input>
                        <label for="4">4</label>
                        <input type="radio" id="5" name="difficulty" value="5" onChange={handleOnChange}></input>
                        <label for="5">5</label>
                        {errors.difficulty ?<p className={style.error}>{errors.difficulty}</p>: null}


                    </div>
                    <div>
                        <label>Duration: </label><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className={style.duration} onClick={()=> handleDuration(-1)}>-</button>&nbsp;
                        <span><b>{form.duration}</b></span>&nbsp;
                        <button type="button" className={style.duration} onClick={()=> handleDuration(1)}>+</button>
                        <label> Hrs</label>
                        {errors.duration ?<p className={style.error}>{errors.duration}</p>: null}
                    </div>
                    <div>
                        <label>Season: </label> <br/><br/>
                        <input type="radio" id="summer" value="summer" name="season" defaultChecked onChange={handleOnChange}></input>
                        <label>Summer</label>
                        <input type="radio" id="spring" value="spring" name="season" onChange={handleOnChange}></input>
                        <label>Spring</label>
                        <input type="radio" id="winter" value="winter" name="season" onChange={handleOnChange}></input>
                        <label>Winter</label>
                        <input type="radio" id="autumn" value="autumn" name="season" onChange={handleOnChange}></input>
                        <label>Autumn</label>
                    </div>
                    <div>
                        <label>Add Country </label>
                        <select name="country" className={style.selectCountry} value={form.country} onChange={handleCountry}>
                            <option value="">--Select--</option>
                            {countries && countries.map(e =>{
                                return <option key={e.id} value={e.name}>{e.name}</option>
                            })}
                        </select>
                        {errors.countries ?<p className={style.error}>{errors.countries}</p>: null}
                    </div>
                    <div>
                        <button className={style.button} type="submit"> Save</button><br/><br/>
                        {form.country.length >0 && form.country.map( e=>{
                            return <h5 key={e}>{e}</h5>
                        })}
                    </div>
                </form>
            </fieldset>
        </div>

        </div>
    )
}