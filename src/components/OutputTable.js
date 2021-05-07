import { useContext } from 'react'
import {Table} from 'react-bootstrap'
import {ControlContext} from '../App'
function OutputTable() {
    const controller = useContext(ControlContext)
    return (
      <div className='container'>
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
            </tr>
          </thead>
          <tbody>
          {controller.data.map((item,index) => (
            <tr key={index} style={{ width: '60rem' }}>
              <td>{item.id}</td>
              <td>{item.car_name}</td>
              <td>{item.car_mileage}</td>
              <td>{item.distance_between_entry}</td>
              <td>{item.txn_date}</td>
              <td>{item.txn_gas_total}</td>
              <td>{item.txn_mpg}</td>
              <td>{item.txn_total}</td>
            </tr>
          ))} 
          </tbody>
        </Table>
      </div>
    )
  }

  export default OutputTable