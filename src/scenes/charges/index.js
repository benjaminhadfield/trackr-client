import React from 'react'
import { connect } from 'react-redux'
import withNav from '../../enhancers/withNav'
import withAuth from '../../enhancers/withAuth'
import { getCharges } from '../../data/charge/actions'

class Charges extends React.Component {
  componentDidMount () {
    this.props.actions.getCharges()
  }

  render () {
    return (
      <div>Content</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    getCharges: () => dispatch(getCharges())
  }
})

export default connect(null, mapDispatchToProps)(withAuth(withNav(Charges)))
