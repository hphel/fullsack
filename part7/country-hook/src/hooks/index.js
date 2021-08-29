import axios from 'axios';
import { useState, useEffect } from 'react';


const useCountry = (countryName) => {
    const [value, setValue] = useState(null)

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
        .then(res => setValue({
            data: res.data[0],
            found: true
        })).catch(e => setValue({
            found: false
        }))
    }, [countryName])

    return {
        ...value
    }
}

export { useCountry }
