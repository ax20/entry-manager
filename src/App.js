import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import useController from './hooks/useController'

export const ControlContext = React.createContext()

function App() {
  const controller = useController('http://localhost:5000')
  return (
    <ControlContext.Provider value = {controller}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </ControlContext.Provider>
  )
}

export default App