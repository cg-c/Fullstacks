import { useState } from 'react'
import countryServices from './services/countries'
import ShowCountries from './components/ShowCountries.jsx'
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
      <ShowCountries validCountries={validCountries} />
    </div>
  )
}

export default App
