import axios from 'axios';
import { useState, useEffect } from 'react';


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const useResource = (url) => {
    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await axios.get(url)
        return response.data
    }
      
    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }
        
        const response = await axios.post(url, newObject, config)
        setResources([...resources, response.data])
    }
      
    const update = async (id, newObject) => {
        const response = await axios.put(`${ url } /${id}`, newObject)
        const updatedResources = resources.map(r => {
            if (r.id === id) {
                return response.data
            }
            return r
        })
        setResources(updatedResources)
    }

    useEffect(() => {
        getAll().then(
            (data) => setResources(data)
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [
        resources, { getAll, create, update }
    ]
}

export { useResource }


