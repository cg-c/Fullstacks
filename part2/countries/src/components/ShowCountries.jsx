import Views from "./Views"

const ShowCountries = ({validCountries, showView}) => {

    if (validCountries.length > 10) {
        return (
            <><p>Too many matches, specify another filter</p></>
        )
    }
    else if (validCountries.length == 1) {
        return (
            <>
                <Views country={validCountries[0]} />
            </>
        )
    }
    else {
        return (
            <div>
                {validCountries.map(c =>
                    <p key={c.name.common}>{c.name.common} <button onClick={() => showView(c)}>Show</button></p>
                )}
            </div>
        )
    }
}

export default ShowCountries