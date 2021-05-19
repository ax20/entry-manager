import { Navbar } from 'react-bootstrap'
export default function Footer() {
    return(
        <Navbar className="bg-primary text-white fixed-bottom">
            <p>
                Created by
                <br />      
                <i>Ashwin Charathsandran and David Liang</i>
                <br />
                Last Updated: May 8, 2021
            </p>
        </Navbar>
    )
}