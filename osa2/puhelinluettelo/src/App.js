import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterControl = ({filter, handleFilterChange}) => (
  <>filter shown with: <input value={filter} onChange={handleFilterChange} /></>
)

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      <br />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const PersonList = ({persons, filter}) => (
  persons
    .filter(p => p.name.toLowerCase().includes(filter))
    .map(p => (
      <p key={p.name}>{p.name} {p.number}</p>
    ))
)

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(newName && newNumber) {
      if(persons.filter(p => p.name === newName).length > 0) {
        window.alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('') 
        setNewNumber('')
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterControl filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
          handleSubmit={handleSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} />
    </div>
  )

}

export default App
