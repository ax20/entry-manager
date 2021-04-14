//import { useLocation } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const DataTable= () => {
    //const path = 'https://cors-anywhere.herokuapp.com/https://api.ashwin.lol/damocles/v1' + useLocation().pathname
    const path = 'https://jsonplaceholder.typicode.com/posts/'
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
                <th>UserId</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
            </thead>
            <tbody>
                {loading ? null: info.map(item=>(
                        <tr key={item.id}>
                            <td>{item.userId}</td>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                        </tr>
                ))}
                {error ? error : null}
            </tbody>
        </Table>
        </Fragment>
    )
}

export default DataTable