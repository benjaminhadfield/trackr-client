import React from 'react'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import List from 'material-ui/List'
import withNav from '../../enhancers/withNav'
import withAuth from '../../enhancers/withAuth'
import { chargesSelector, orderSelector } from '../../data/charge/selectors'
import { getCharges } from '../../data/charge/actions'

import ChargeItem from './components/chargeItem'

class Charges extends React.Component {
  state = {
    open: false
  }

  componentDidMount () {
    this.props.actions.getCharges()
  }

  render () {
    const { charge } = this.props
    return (
      <Grid container>
        <List>
          {charge.order.map(id => (
            <ChargeItem key={id} {...charge.entities[id]} />
          ))}
        </List>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  charge: {
    entities: chargesSelector(state),
    order: orderSelector(state)
  }
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getCharges: () => dispatch(getCharges())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withNav(Charges)))
