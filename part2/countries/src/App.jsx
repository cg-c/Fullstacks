import { useState } from 'react'
import countryServices from './services/countries'
import ShowCountries from './components/ShowCountries.jsx'
import Views from './components/Views.jsx'
import { use } from 'react'
import { useEffect } from 'react'

function App() {
  const [validCountries, setValidCountries] = useState([])
  const [countryName, setCountryName] = useState("")

  useEffect(() => {
    countryServices
      .getAll()
      .then(returnedCountry => {
        setValidCountries(returnedCountry.filter(n => n.name.common.toLowerCase().includes(countryName.toLowerCase())))
    })
  }, [countryName])

  const showView = (country) => {
    setValidCountries([].concat(country))
  }

  const handleChangeName = (event) => {
    setCountryName(event.target.value)
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          find countries <input 
            value={countryName}
            onChange={handleChangeName}
          />
        </div>
      </form>
      <ShowCountries validCountries={validCountries} showView={showView} />
    </div>
  )
}

export default App
