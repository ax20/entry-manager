import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main'
import useController from './hooks/useController'

export const ControlContext = React.createContext()

function App() {
  const controller = useController('http://localhost:5000')
  //console.log(controller.nameImageList())
  return (
    <ControlContext.Provider value = {controller}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </ControlContext.Provider>
  )
}

export default App
