import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, data) => axios.put(`${baseUrl}/${id}`, data)

export default { 
  getAll: getAll, 
  create: create,
  remove: remove,
  update: update
}