import { useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"
import {ControlContext} from '../App'
function InputModal() {
    const controller = useContext(ControlContext)
    return (
        <Modal show={controller.show} onHide={controller.handleClose} >
            <Form onSubmit={controller.handleSubmit}>
                <Modal.Header closeButton>
                    <h3 className="text-primary">New Record</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Car Name</Form.Label>
                    <Form.Control
                    placeholder="Nissan"
                    type="text"
                    value={controller.carname.value}
                    onChange={controller.carname.handleChange}
                    />
                    <Form.Label>Mileage</Form.Label>
                    <Form.Control
                    placeholder="10000"
                    type="number"
                    value={controller.mileage.value}
                    onChange={controller.mileage.handleChange}
                    />
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                    placeholder="1000.0"
                    type="number"
                    step="any"
                    value={controller.total.value}
                    onChange={controller.total.handleChange}
                    />
                    <Form.Label>Gas Total</Form.Label>
                    <Form.Control
                    placeholder="1000.0"
                    type="number"
                    step="any"
                    value={controller.gastotal.value}
                    onChange={controller.gastotal.handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default InputModal 