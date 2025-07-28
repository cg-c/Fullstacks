const Persons = ({filter, persons, onClick}) => {
    let display

    if (filter.length > 0) {
      display = persons.filter(ppl => ppl.name.toLowerCase().includes(filter.toLowerCase()))
    }
    else display = [...persons]

    return (
        <>
            {display.map(ppl =>
                <p key={ppl.id}>{ppl.name} {ppl.number} <button onClick={() => onClick(ppl.id)}>delete</button></p>
            )}
        </>
    )
}

export default Persons