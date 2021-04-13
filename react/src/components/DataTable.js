import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const DataTable= () => {
    const path = 'https://api.ashwin.lol/damocles/v1' + useLocation().pathname
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [info, setInfo] = useState([])
    useEffect(() => {
        axios.get(path)
            .then(response => {
                setLoading(false)
                setInfo(response.data)
                setError('')
            })
            .catch(error => {
                setLoading(false)
                setInfo([])
                setError('Something went wrong!')
            })
    },[path])

    return (
        <header>
            <h1>Data Table</h1>
            {loading ? 'Loading': console.log(info)}
            {error ? error : null}
        </header>
    )
}

export default DataTable