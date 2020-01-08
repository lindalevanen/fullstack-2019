import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import { ALL_BOOKS } from './Books'

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e, addBook) => {
    e.preventDefault()

    const res = await addBook({
      variables: { 
        title,
        author,
        published: parseInt(published), genres 
      }
    })

    if(res) {
      setTitle('')
      setPublished('')
      setAuhtor('')
      setGenres([])
      setGenre('')  
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }]}>
        {(addBook) => (

          <form onSubmit={(e) => { submit(e, addBook);}}>
            <div>
              title
              <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                value={author}
                onChange={({ target }) => setAuhtor(target.value)}
              />
            </div>
            <div>
              published
              <input
                type='number'
                value={published}
                onChange={({ target }) => setPublished(target.value)}
              />
            </div>
            <div>
              <input
                value={genre}
                onChange={({ target }) => setGenre(target.value)}
              />
              <button onClick={addGenre} type="button">add genre</button>
            </div>
            <div>
              genres: {genres.join(' ')}
            </div>
            <button type='submit'>create book</button>
          </form>
        )}
      </Mutation>

    </div>
  )
}

export default NewBook