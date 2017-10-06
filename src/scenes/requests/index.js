import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../../enhancers/withAuth'
import withNav from '../../enhancers/withNav'

class Requests extends React.Component {
  static title = 'My Charges'

  render () {
    return (
      <div>Requests</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {}
})

export default connect(null, mapDispatchToProps)(withAuth(withNav(Requests)))
