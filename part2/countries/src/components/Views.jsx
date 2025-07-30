import countryServices from '../services/countries'
import { use, useEffect, useState } from 'react'

const Views = ({country}) => {

    const [temperature, setTemperature] = useState(null)
    const [wind, setWind] = useState(null)
    const [icon, setIcon] = useState("https://openweathermap.org/img/wn/")
    const iconUrl = "https://openweathermap.org/img/wn/"

    useEffect(() => {
        countryServices
            .getWeather(country.capital[0])
            .then(returnedWeather => {
                setTemperature(returnedWeather.main.temp)
                setWind(returnedWeather.wind.speed)
                setIcon(`${iconUrl}${returnedWeather.weather[0].icon}@4x.png`)
                
            })
    })

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2> 
            <ul>
                {Object.values(country.languages).map(element => {
                    return <li key={element}>{element}</li>
                })} 
            </ul>
            <img src={country.flags.png} />
            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature {temperature} Celsius</p>
            <img src={icon} />
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default Views