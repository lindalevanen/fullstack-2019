import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const GET_ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const GET_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }

`

const Recommended = (props) => {
  const [me, setMe] = useState('')
  const [recBooks, setRecBooks] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    console.log("1")
    const getMe = async () => {
      const { data } = await client.query({
        query: GET_ME
      })
      setMe(data.me)
    }
    getMe()

  }, [client])

  useEffect(() => {
    console.log("2")
    if(me) {
      const getRecommendedBooks = async () => {
        const { data } = await client.query({
          query: GET_BOOKS_BY_GENRE,
          variables: { genre: me.favoriteGenre }
        })
        console.log(data)
        setRecBooks(data.allBooks)
      }
      getRecommendedBooks()
    }
  }, [client, me])

  if (!props.show) {
    return null
  }

  if(!recBooks) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre 
        <span style={{fontWeight: 'bold'}}> {me.favoriteGenre}</span>
      </p>
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
          {recBooks.map((b, i) =>
            <tr key={i}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Recommended