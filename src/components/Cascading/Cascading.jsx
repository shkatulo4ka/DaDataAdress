import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import React from 'react';
import './Cascading.css';

function Cascading() {
    const [countries, setCountries] = useState([]);

    const fetchData = async() => {
        const res = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',    
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": 'Token 29a3c32b070aef88cbba686d6a7bb16931b236e6'
            },
            body: JSON.stringify({
          "query": "Р",
          "from_bound": {
            "value": "country"
          },
          "to_bound": {
            "value": "country"
          },
            "locations": [{
                "country_iso_code": "*" 
            }]
})
        })
        const resjson = await res.json()
        console.log(resjson)
        setCountries(resjson.suggestions)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSelect = (event) => {
        console.log(event.target.value)
    }

    return (
    <Form.Select className='form-select' aria-label="Default select example" onChange={(e=>handleSelect(e))}>
      <option>Введите название страны</option>
      {countries.map((value) => 
        {<option value={countries[value]['value']}>{countries[value]['value']}</option>}
      )}
    </Form.Select>
    )
}

export default Cascading
