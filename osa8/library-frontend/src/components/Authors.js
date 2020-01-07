import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Select from 'react-select';

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log('modify birthyear...')

    setName('')
    setBorn('')
  }

  return (
    <Query query={ALL_AUTHORS}>
      {(result) => {
        if(result.loading) {
          return <div>loading...</div>
        }
        return (
          <div>
            <h2>authors</h2>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>
                    born
                  </th>
                  <th>
                    books
                  </th>
                </tr>
                {result.data.allAuthors.map(a =>
                  <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                  </tr>
                )}

              </tbody>
            </table>
            <h2>Set birthyear</h2>
          <div>
            <Mutation mutation={UPDATE_BIRTHYEAR} refetchQueries={[{ query: ALL_AUTHORS }]}>
              {(addBook) => (
                <form onSubmit={(e) => { 
                  submit(e);
                  addBook({variables: { name: name.value, born: parseInt(born) }})
                }}>
                  <Select
                    value={name}
                    onChange={(option) => setName(option) }
                    options={result.data.allAuthors.map(a => ({ value: a.name, label: a.name }))}
                  />
                  <div>
                    born
                    <input
                      value={born}
                      onChange={({ target }) => setBorn(target.value)}
                    />
                  </div>
                  <button type='submit'>update author</button>
                </form>
              )}
            </Mutation>
          </div>
        </div>
      )}}
    </Query>
  )
}

export default Authors