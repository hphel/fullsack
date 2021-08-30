import axios from 'axios'
const baseUrl = '/api/users'

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return request.then(response => response.data)
}

const getById = (token, id) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getById }