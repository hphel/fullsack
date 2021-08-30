import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return request.then(response => response.data)
}

const add = (token, blog) => {
    return axios.post(baseUrl, blog, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addComment = (token, blogId, comment) => {
    return axios.post(`${baseUrl}/${blogId}/comments`, { comment }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const update = (token, blog) => {
    return axios.put(`${baseUrl}/${blog.id}`, blog, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const remove = (token, id) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, add, update, remove, addComment }