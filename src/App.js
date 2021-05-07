import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import useController from './hooks/useController'
import useFormInput from './hooks/useFormInput'

export const ControlContext = React.createContext()

function App() {
  const carname = useFormInput('Nissan')
  const mileage = useFormInput(10000)
  const total = useFormInput(1000.0)
  const gastotal = useFormInput(1000.0)
  const controller = useController('http://localhost:5000/view/Nissan'
    ,carname,mileage,total,gastotal)
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

export default App;