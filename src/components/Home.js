import { useContext } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import InputModal from './InputModal'
import OutputTable from './OutputTable'
import { ControlContext } from '../App'

function Home() {
    const controller = useContext(ControlContext)
    return(
        <div className='container'>
            <Navbar className="bg-light justify-content-between">
                <Button variant="primary" onClick={controller.modal.handleShow}>
                    Create Record
                </Button>
            </Navbar>
            <InputModal/>
            <OutputTable/>
        </div>
    )
}

export default Home