import React, { useState, useEffect } from 'react'
import './app.css'
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${message.success ? 'success' : 'error'}`}>
      {message.text}
    </div>
  )
}


const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

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

  const showNotification = (text, success) => {
    setNotificationMessage({text, success})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createPerson = person => {
    PersonService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        clearFields()
        showNotification(`Added ${newPerson.name}`, true)
      })
      .catch(error => {
        if(error.response.data.error) {
          showNotification(error.response.data.error, false)
        } else {
          showNotification(`Adding the number for ${person.name} failed.`, false)
        }
      })
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) { 
      PersonService
        .remove(person.id)
        .then(() => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
          showNotification(`Deleted ${person.name}`, true)
        })
        .catch(error => {
          showNotification(`Information of ${person.name} has already been removed from the server`, false)
        })
    }
  }

  const updatePerson = (id, updatedPerson) => {
    PersonService
      .update(id, updatedPerson)
      .then(newPerson => {
        setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
        clearFields()
        showNotification(`Updated ${newPerson.name}`, true)
      })
      .catch(error => {
        console.log(error.response.data)
        if(error.response.data.error) {
          showNotification(error.response.data.error, false)
        } else {
          showNotification(`Information of ${updatedPerson.name} has already been removed from the server`, false)
        }
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
      <Notification message={notificationMessage}  />

      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} onPersonDelete={deletePerson} />
    </div>
  )

}

export default App
