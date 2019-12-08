import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const object = { content }
  object.votes = 0
  const response = await axios.post(url, object)
  return response.data
}

const update = async (object, newVotes) => {
  const updatedObj = {...object, votes: newVotes}
  const response = await axios.put(`${url}/${object.id}`, updatedObj)
  return response.data
}


export default { getAll, createNew, update }
