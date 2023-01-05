import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-1231244'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map(person =>
                    <li key={person.name}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )

}

export default App