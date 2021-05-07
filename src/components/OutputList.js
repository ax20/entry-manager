import { useContext } from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import {ControlContext} from '../App'
function OutputList() {
    const controller = useContext(ControlContext)
    return (
      <div className='container'>
        {controller.data.map((item,index) => (
          <Card key={index} style={{ width: '60rem' }}>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>{item.car_name}</ListGroup.Item>
                    <ListGroup.Item>{item.car_mileage}</ListGroup.Item>
                    <ListGroup.Item>{item.distance_between_entry}</ListGroup.Item>
                    <ListGroup.Item>{item.txn_date}</ListGroup.Item>
                    <ListGroup.Item>{item.txn_gas_total}</ListGroup.Item>
                    <ListGroup.Item>{item.txn_mpg}</ListGroup.Item>
                    <ListGroup.Item>{item.txn_total}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  }

  export default OutputList