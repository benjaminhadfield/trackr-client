import React from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Charges from './scenes/charges'
import Create from './scenes/create'
import Requests from './scenes/requests'
import Login from './scenes/login'

export default () => (
  <Router>
    <div>
      <Route exact path='/' component={Charges} />
      <Route exact path='/create' component={Create} />
      <Route exact path='/requests' component={Requests} />
      <Route exact path='/login' component={Login} />
    </div>
  </Router>
)
