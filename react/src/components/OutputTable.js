import { useContext } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Table,Button } from 'react-bootstrap'
import { ControlContext } from '../App'
export default function OutputTable() {
    const controller = useContext(ControlContext)
    const path = useLocation().pathname
    const matchNumber = controller.data.filter(v => ('/' + v.car_name === path)).length
    if(matchNumber!==0)
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Car Name</th>
              <th>Mileage</th>
              <th>Distance Between Entry</th>
              <th>Txn Date</th>
              <th>Txn Gas Total</th>
              <th>Txn mpg</th>
              <th>Txn Total</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
          {controller.data.map((item,index) => 
            path === '/' + item.car_name ? (
            <tr key={index} style={{ width: '60rem' }}>
              <td>{item.id}</td>
              <td>{item.car_name}</td>
              <td>{item.car_mileage}</td>
              <td>{item.distance_between_entry}</td>
              <td>{item.txn_date}</td>
              <td>{item.txn_gas_total}</td>
              <td>{item.txn_mpg}</td>
              <td>{item.txn_total}</td>
              <td><Button variant="danger" data-key={item.id} onClick={controller.handleDelete}>Delete</Button></td>
              <td><Button variant="success" data-key={item.id} onClick={controller.handleUpdate}>Update</Button></td>
            </tr>
          ):null)} 
          </tbody>
        </Table>
      </div>
    )
    else return <Redirect to='/'/>
  }