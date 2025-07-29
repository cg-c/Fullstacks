const ShowCountries = ({validCountries}) => {

    if (validCountries.length > 10) {
        return (
            <><p>Too many matches, specify another filter</p></>
        )
    }
    else if (validCountries.length == 1) {
        return (
            <div>
                <h1>{validCountries[0].name.common}</h1>
                <p>Capital {validCountries[0].capital[0]}</p>
                <p>Area {validCountries[0].area}</p>
                <h2>Languages</h2> 
                <ul>
                    {Object.values(validCountries[0].languages).map(element => {
                        return <li key={element}>{element}</li>
                    })} 
                </ul>
                <img src={validCountries[0].flags.png} />
            </div>
        )
    }
    else {
        return (
            <div>
                {validCountries.map(c =>
                    <p key={c.name.common}>{c.name.common}</p>
                )}
            </div>
        )
    }
}

export default ShowCountries