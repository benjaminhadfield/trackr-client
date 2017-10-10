import React from 'react'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import withNav from '../../enhancers/withNav'
import withAuth from '../../enhancers/withAuth'
import { usersSelector, idSelector } from '../../data/user/selectors'
import { chargesSelector, orderSelector, loadingSelector } from '../../data/charge/selectors'
import { getCharges, markAsPaid } from '../../data/charge/actions'

import ChargeItem from './components/chargeItem'

class Charges extends React.Component {
  state = {
    open: false
  }

  static title = 'Charges'

  componentDidMount () {
    const { charge } = this.props
    if (!charge.order.length) {
      this.props.actions.getCharges()
    }
  }

  render () {
    const { charge, user, actions } = this.props

    return (
      <div>
        {charge.loading && <CircularProgress />}
        <Grid>
          <List>
            {charge.order.map(id => (
              <ChargeItem
                key={id}
                user={user}
                actions={{
                  markAsPaid: actions.markAsPaid
                }}
                charge={charge.entities[id]}
              />
            ))}
          </List>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  charge: {
    entities: chargesSelector(state),
    order: orderSelector(state),
    loading: loadingSelector(state)
  },
  user: {
    entities: {
      users: usersSelector(state)
    },
    id: idSelector(state)
  }
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getCharges: () => dispatch(getCharges()),
    markAsPaid: id => dispatch(markAsPaid(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withNav(Charges)))
