const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Henry Cavill',
    url: 'www.lol.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8cb',
    title: 'HTML is awful',
    author: 'Henry Cavill',
    url: 'www.loler.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8ca',
    title: 'HTML is hard',
    author: 'Lilith Marks',
    url: 'www.lols.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },

]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return null
}

export default { getAll, setToken }