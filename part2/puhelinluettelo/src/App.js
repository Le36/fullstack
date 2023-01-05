import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addNew = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = ({target}) => setNewName(target.value)
    const handleNumberChange = ({target}) => setNewNumber(target.value)
    const handleFilterChange = ({target}) => setNewFilter(target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
                </div>
            </form>
            <h2>Add a new</h2>
            <form onSubmit={addNew}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.filter(({name}) => {
                    return name.toLowerCase().includes(newFilter.toLowerCase())
                }).map(({name, number}) =>
                    <li key={name}>{name} {number}</li>
                )}
            </ul>
        </div>
    )

}

export default App