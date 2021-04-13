import Header from './components/Header'
import Overview from './components/Overview'
import DataTable from './components/DataTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const menuTree = [{
  'name':'Fuel',
  'list':['Matryx', 'two']
},{
  'name':'Gym',
  'list':['one', 'two']
}]

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          {menuTree.map((items,index) => (
            <Fragment key={index}>
              <Route path= {"/" + items.name} component={Overview} />
              {items.list.map((subItems, index)=>(
                <Fragment key={index}>
                  <Route path= {"/" +items.name+"/"+ subItems} component={DataTable} />
                </Fragment>
              ))}
            </Fragment>
          ))}
          <Route component={My404Component} />
        </Switch>
      </Container>
    </BrowserRouter>
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