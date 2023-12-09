import style from './Styles/CreateActivity.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllCountries, createActivity, addIdCountries } from '../redux/actions'
import { validate } from '../Validations/index'

export default function CreateActivity(props) {
  const [form, setForm] = useState({
    name: '',
    difficulty: '1',
    duration: 0,
    season: 'summer',
    country: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: '',
  })

  const [countryState, setCountryState] = useState([])
  const countries = useSelector((state) => state.countries)

  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

    let name = validate({ [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: name })
  }

  const handleCountry = (e) => {
    let value = e.target.value
    if (value) {
      const id = countries.find((e) => e.name === value).id
      if (countryState.includes(id)) alert('The country is already added')
      else {
        setErrors({ ...errors, countries: '' })
        setCountryState([...countryState, id])
        setForm({ ...form, country: [...form.country, e.target.value] })
      }
    }
  }

  const removeCountry = (country) => {
    const id = countries.find((e) => e.name === country).id
    setCountryState(countryState.filter((e) => e !== id))
    setForm({ ...form, country: form.country.filter((e) => e !== country) })
  }

  const handleDuration = (value) => {
    let val = validate({ duration: form.duration + value })
    if (val) setErrors({ ...errors, duration: val })
    else {
      setErrors({ ...errors, duration: '' })
      setForm({ ...form, duration: form.duration + value })
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const value = {
      name: form.name,
      difficulty: form.difficulty,
      duration: '' + form.duration,
      season: form.season,
    }

    if (!errors.name && !errors.difficulty && !errors.season) {
      if (value.name.length === 0) setErrors({ ...errors, name: 'The name cannot be empty' })
      else if (form.duration === 0) setErrors({ ...errors, duration: 'Duration must be greater than 0' })
      else if (form.country.length === 0) setErrors({ ...errors, countries: 'You must select at least one country' })
      else {
        dispatch(createActivity(value, countryState))
        dispatch(addIdCountries(countryState))
        alert('Added')
        props.history.goBack()
      }
    }
  }

  useEffect(() => {
    dispatch(getAllCountries())
  }, [])

  return (
    <div className={style.main}>
      <fieldset className={style.fieldset}>
        <button className={style.buttonBack} onClick={() => props.history.goBack()}>
          Back
        </button>
        <legend className={style.legend}>New Activity</legend>
        <form className={style.form} onSubmit={handleOnSubmit} autoComplete='off'>
          <div>
            <label>Name: </label>
            <br />
            <br />
            <input type='text' name='name' onChange={handleOnChange} className={`${style.name} ${errors.name && style.danger}`}></input>
            {errors.name ? <p className={style.error}>{errors.name}</p> : null}
          </div>
          <div>
            <label>Difficulty: </label>
            <br />
            <br />

            <input type='radio' id='1' name='difficulty' value='1' defaultChecked onChange={handleOnChange}></input>
            <label htmlFor='1'>1</label>
            <input type='radio' id='2' name='difficulty' value='2' onChange={handleOnChange}></input>
            <label htmlFor='2'>2</label>
            <input type='radio' id='3' name='difficulty' value='3' onChange={handleOnChange}></input>
            <label htmlFor='3'>3</label>
            <input type='radio' id='4' name='difficulty' value='4' onChange={handleOnChange}></input>
            <label htmlFor='4'>4</label>
            <input type='radio' id='5' name='difficulty' value='5' onChange={handleOnChange}></input>
            <label htmlFor='5'>5</label>
            {errors.difficulty ? <p className={style.error}>{errors.difficulty}</p> : null}
          </div>
          <div>
            <label>Duration: </label>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type='button' className={style.duration} onClick={() => handleDuration(-1)}>
              -
            </button>
            &nbsp;
            <span>
              <b>{form.duration}</b>
            </span>
            &nbsp;
            <button type='button' className={style.duration} onClick={() => handleDuration(1)}>
              +
            </button>
            <label> Hrs</label>
            {errors.duration ? <p className={style.error}>{errors.duration}</p> : null}
          </div>
          <div>
            <label>Season: </label> <br />
            <br />
            <input type='radio' id='summer' value='summer' name='season' defaultChecked onChange={handleOnChange}></input>
            <label>Summer</label>
            <input type='radio' id='spring' value='spring' name='season' onChange={handleOnChange}></input>
            <label>Spring</label>
            <input type='radio' id='winter' value='winter' name='season' onChange={handleOnChange}></input>
            <label>Winter</label>
            <input type='radio' id='autumn' value='autumn' name='season' onChange={handleOnChange}></input>
            <label>Autumn</label>
          </div>
          <div>
            <label>Add Country </label>
            <select name='country' className={style.selectCountry} value={form.country} onChange={handleCountry}>
              <option value=''>--Select--</option>
              {countries &&
                countries
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    )
                  })}
            </select>
            {errors.countries ? <p className={style.error}>{errors.countries}</p> : null}
          </div>
          <div className={style.countriesList}>
            {form.country.length > 0 &&
              form.country.map((e) => (
                <section className={style.country} key={e}>
                  <p key={e}>{e}</p>
                  <span className={style.countryRemove} onClick={() => removeCountry(e)}>
                    x
                  </span>
                </section>
              ))}
          </div>
          <div>
            <button className={style.button} type='submit'>
              Save
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}
