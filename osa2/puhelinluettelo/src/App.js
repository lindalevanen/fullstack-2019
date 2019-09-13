import React, { useState, useEffect } from 'react'

import PersonService from './PersonService'

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

const PersonList = ({persons, filter, onPersonDelete}) => (
  persons
    .filter(p => p.name.toLowerCase().includes(filter))
    .map(p => (
      <div key={p.name}>
        <span>{p.name} {p.number}</span>
        <button onClick={() => onPersonDelete(p)}>DELETE</button>

      </div>
    ))
)

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(personList => {
        setPersons(personList)
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
      const existingPerson = persons.find(p => p.name === newName)
      if (existingPerson) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(existingPerson.id, {...existingPerson, number: newNumber})
        }
      } else {
        createPerson({name: newName, number: newNumber})
      }
    }
  }

  const createPerson = person => {
    PersonService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        clearFields()
      })
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) { 
      PersonService
        .remove(person.id)
        .then(deletedPerson => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
        })
    }
  }

  const updatePerson = (id, updatedPerson) => {
    PersonService
      .update(id, updatedPerson)
      .then(newPerson => {
        setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
        clearFields()
      })
  }

  const clearFields = () => {
    setNewName('') 
    setNewNumber('')
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
      <PersonList persons={persons} filter={filter} onPersonDelete={deletePerson} />
    </div>
  )

}

export default App
