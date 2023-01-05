import {useEffect, useState} from 'react'
import axios from "axios";


const Persons = ({newFilter, persons}) => {
    return (
        <>
            <ul>
                {persons.filter(person => {
                    return person.name.toLowerCase().includes(newFilter.toLowerCase())
                }).map((person) =>
                    <li key={person.name}>{person.name} {person.number}</li>
                )}
            </ul>
        </>
    )
}

const PersonForm = ({onChange, onChange1, onSubmit, value, value1}) => {
    return <form onSubmit={onSubmit}>
        <div>
            name: <input value={value} onChange={onChange}/>
        </div>
        <div>
            number: <input value={value1} onChange={onChange1}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>;
}


const Filter = ({onChange, value}) => {
    return <form>
        <div>
            filter shown with: <input value={value} onChange={onChange}/>
        </div>
    </form>;
}


const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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
            <Filter value={newFilter} onChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <PersonForm onSubmit={addNew} value={newName} onChange={handleNameChange} value1={newNumber}
                        onChange1={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter}></Persons>
        </div>
    )

}

export default App