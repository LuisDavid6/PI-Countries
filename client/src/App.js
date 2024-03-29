import './App.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Country from './components/Country'
import CreateActivity from './components/CreateActivity'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/country/:id' component={Country} />
        <Route path='/createActivity' component={CreateActivity} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
