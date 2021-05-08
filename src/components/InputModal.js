import { useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"
import {ControlContext} from '../App'
function InputModal() {
    const controller = useContext(ControlContext)
    return (
        <Modal show={controller.modal.show} onHide={controller.modal.handleClose} animation={false}>
            <Form onSubmit={
                controller.isUpdate?
                controller.handleUpdateSubmit:
                controller.form.handleSubmit
                }>
                <Modal.Header closeButton>
                    <h3 className="text-primary">
                    {controller.isUpdate?('Update Record'):('New Record')}    
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Car Name</Form.Label>
                    <Form.Control
                    placeholder="Nissan"
                    type="text"
                    value={controller.form.carname.value}
                    onChange={controller.form.carname.handleChange}
                    />
                    <Form.Label>Mileage</Form.Label>
                    <Form.Control
                    placeholder="10000"
                    type="number"
                    value={controller.form.mileage.value}
                    onChange={controller.form.mileage.handleChange}
                    />
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                    placeholder="1000.0"
                    type="number"
                    step="any"
                    value={controller.form.total.value}
                    onChange={controller.form.total.handleChange}
                    />
                    <Form.Label>Gas Total</Form.Label>
                    <Form.Control
                    placeholder="1000.0"
                    type="number"
                    step="any"
                    value={controller.form.gastotal.value}
                    onChange={controller.form.gastotal.handleChange}
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