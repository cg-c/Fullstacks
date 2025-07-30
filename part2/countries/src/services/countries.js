import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const api_key = import.meta.env.VITE_WEATHER_KEY
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get( `${baseUrl}/api/name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
    const request = axios.get(`${weatherUrl}q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll, getCountry, getWeather }