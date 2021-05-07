import { Fragment, useContext } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import InputModal from './InputModal'
import {ControlContext} from '../App'
function Home() {
    const controller = useContext(ControlContext)
    return(
        <Fragment>
            <Navbar className="bg-light justify-content-between">
                <Button variant="primary" onClick={controller.handleShow}>
                    Create Record
                </Button>
            </Navbar>
            <InputModal/>
        </Fragment>
    )
}

export default Home