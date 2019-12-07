import React from 'react'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(changeFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter