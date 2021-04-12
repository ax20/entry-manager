import Header from './components/Header'
import Overview from './components/Overview'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const menuTree = [{
  'name':'Fuel',
  'list':['Matryx', 'two']
},{
  'name':'Gym',
  'list':['one', 'two']
}]

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          {menuTree.map((items,index) => (
            <Fragment key={index}>
              <Route path= {"/" + items.name} component={Overview} />
            </Fragment>
          ))}  
          {menuTree.map((items,index) => (
            <Fragment key={index}>
              {items.list.map((subItems, index)=>(
                <Fragment key={index}>
                  <Route path= {"/" +items.name+"/"+ subItems} component={Overview} />
                </Fragment>
              ))}
            </Fragment>
          ))}  
          <Route component={My404Component} />
        </Switch>
      </Container>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Container>
      <Row>
      {menuTree.map((items,index) => (
        <Col key={index}>
          <Link to={"/" + items.name} style={{ textDecoration: 'none' }}>
            <Card border = 'primary'>
            <Card.Body>
                <Card.Text>{items.name}</Card.Text>
            </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
      </Row>
    </Container>
  </div>
)

const My404Component = () => (
  <Container>
    404
  </Container>
)

export default App;