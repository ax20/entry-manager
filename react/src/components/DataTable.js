import { useLocation } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function DataTable() {
    //const path = 'https://api.ashwin.lol/damocles/v1' + useLocation().pathname
    //const path = 'https://jsonplaceholder.typicode.com/posts/'
    const path = 'http://localhost:4000' + useLocation().pathname
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
        <Fragment>
            {console.log(info)}
        <h1>Data Table</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Car Name</th>
                <th>MPG</th>
                <th>Distance</th>
                <th>Mileage</th>
                <th>Gas Total</th>
            </tr>
            </thead>
            <tbody>
                {loading ? null: info.map(item=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.carName}</td>
                        <td>{item.mpg}</td>
                        <td>{item.distance}</td>
                        <td>{item.mileage}</td>
                        <td>{item.gasTotal}</td>
                    </tr>
                ))}
                {error ? error : null}
            </tbody>
        </Table>
        </Fragment>
    )
}

export default DataTable