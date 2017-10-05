import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../../enhancers/withAuth'
import withNav from '../../enhancers/withNav'

class Create extends React.Component {
  render () {
    return (
      <div>Create</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {}
})

export default connect(null, mapDispatchToProps)(withAuth(withNav(Create)))
