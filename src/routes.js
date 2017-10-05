import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Charges from './scenes/charges'

export default () => (
  <Router>
    <div>
      <Route exact path='/' component={Charges} />
    </div>
  </Router>
)
