import '../css/SideBar.css'
import { ControlContext } from '../App'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
function SideBar() {
    const controller = useContext(ControlContext)
    return(
        <div className="sidenav bg-primary">
            <Link to='/'>Home</Link>
            {controller.nameList().map((item,index) => (
                <Link to={"/" + item } key={index}>
                    {item}
                </Link>
            ))}
        </div>
    )
}

export default SideBar