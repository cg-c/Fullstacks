const Persons = ({filter, persons}) => {
    let display

    if (filter.length > 0) {
      display = persons.filter(ppl => ppl.name.toLowerCase().includes(filter.toLowerCase()))
    }
    else display = [...persons]

    return (
        <>
            {display.map(ppl =>
                <p key={ppl.name}>{ppl.name} {ppl.number}</p>
            )}
        </>
    )
}

export default Persons