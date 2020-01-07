import React from 'react'
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
  }
}
`

const Books = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
          <Query query={ALL_BOOKS}>
            {(result) => {
              if(result.loading) {
                return <tr><td>loading...</td></tr>
              }
              return (
                result.data.allBooks.map((b, i) =>
                  <tr key={i}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                )
              )
            }}
          </Query>

        </tbody>
      </table>
    </div>
  )
}

export default Books