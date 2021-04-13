import { useLocation, Link } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap' 
import { menuTree } from '../App'
const Overview = () => {
    const pathList = useLocation().pathname.split('/').filter(Boolean)
    const submenu = menuTree.filter(menu => menu.name === pathList[0])[0].list;
    return (
        <header>
            <h1>Overview</h1>
            <Container>
                <Row>
                {submenu.map((item,index) => (
                    <Col key={index}>
                    <Link to={"/" + pathList[0] + "/" + item} style={{ textDecoration: 'none' }}>
                        <Card border = 'primary'>
                        <Card.Body>
                            <Card.Text>{item}</Card.Text>
                        </Card.Body>
                        </Card>
                    </Link>
                    </Col>
                ))}
                </Row>
            </Container>
        </header>
    )
}

export default Overview