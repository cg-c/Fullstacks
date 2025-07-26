const Filter = ({ filter, onChange }) => {
    return (
        <>
            <form onSubmit={(event) => event.preventDefault()}>
                <div>
                    filter shown with <input value={filter} onChange={onChange} />
                </div>
            </form>
        </>
    )

}

export default Filter