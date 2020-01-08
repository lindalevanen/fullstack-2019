import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  const parseGenres = allBooks => {
    const gs = allBooks.reduce((genreArr, currentBook) => {
      return (genreArr.concat(currentBook.genres.filter(g => !genreArr.includes(g))))
    }, [])
    return gs
  }

  return (
    <div>
      <Query query={ALL_BOOKS}>
        {(result) => {
          if(result.loading) {
            return <div>loading...</div>
          }
          const { allBooks } = result.data
          return (
            <>
              <h2>books</h2>
              <p>in genre {genre}</p>

              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>
                      author
                    </th>
                    <th>
                      published
                    </th>
                  </tr>
                  {allBooks.filter(b => !genre || b.genres.includes(genre)).map((b, i) =>
                    <tr key={i}>
                      <td>{b.title}</td>
                      <td>{b.author.name}</td>
                      <td>{b.published}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {parseGenres(allBooks).map(g => (
                <button 
                  key={g}
                  style={genre === g ? { backgroundColor: 'pink' } : {}}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </>
          )}}
      </Query>
    </div>
  )
}

export default Books