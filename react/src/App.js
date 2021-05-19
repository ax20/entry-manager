import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main'
import useController from './hooks/useController'

export const ControlContext = React.createContext()
export default function App() {
  return (
    <ControlContext.Provider 
      value = {useController('http://localhost:5000')}
    >
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