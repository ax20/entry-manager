import Header from './components/Header'
import Overview from './components/Overview'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/overview" component={Overview} />
      </Switch>
    </div>
  </Router>
  );
}
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;