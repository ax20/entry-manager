import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import InputModal from './InputModal'
import OutputTable from './OutputTable'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import SideBar from './SideBar'

function Main() {
    return(
        <Fragment>
            <Header/>
            <InputModal/>
            <SideBar/>
            <div className="main">
            {useLocation().pathname==='/'?
                <Home/>
                :
                <OutputTable/>
            }
            </div>
            <Footer/>
        </Fragment>
    )
}

export default Main