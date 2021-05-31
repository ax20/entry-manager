import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import useController from './hooks/useController'

export const ControlContext = React.createContext()
function App() {
  return (
    <ControlContext.Provider value={useController('http://localhost:5000')}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </ControlContext.Provider>
  )
}

export default App
