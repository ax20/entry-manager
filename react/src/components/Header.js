import { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import { ControlContext } from '../App'
import '../css/Header.css'
function Header() {
    const controller = useContext(ControlContext)
    return(
        <Navbar className="bg-primary text-dark fixed-top">
            <div className="nav-button" 
                onClick={controller.modal.handleShow}>
                Create Record
            </div>
        </Navbar>
    )
}

export default Header