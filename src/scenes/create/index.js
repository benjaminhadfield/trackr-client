import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import Paper from 'material-ui/Paper'

import withAuth from '../../enhancers/withAuth'
import withNav from '../../enhancers/withNav'
import { loadingSelector } from '../../data/charge/selectors'
import { getUsers } from '../../data/user/actions'
import { usersSelector, idSelector, loadingSelector as chargeLoadingSelector } from '../../data/user/selectors'
import { createCharge } from '../../data/charge/actions'

import CreateForm from './components/createForm'

class Create extends React.Component {
  state = {
    value: {
      display: '',
      value: 0
    },
    splitWith: [],
    title: '',
    message: ''
  }

  static title = 'Create Charge'

  componentDidMount () {
    this.props.actions.getUsers()
  }

  handleValueChange = e => {
    // Clean the raw value to get the integer amount in pence
    const penceAmount = e.target.value.replace(/^(0+?\.0?)/g, '').replace(/\./g, '')
    const formattedValue = [...penceAmount]
    // Add in the decimal point if needed.
    switch (formattedValue.length) {
      case 0:
        formattedValue.splice(0, 0, 0, '.', 0, 0)
        break
      case 1:
        formattedValue.splice(0, 0, 0, '.', 0)
        break
      case 2:
        formattedValue.splice(0, 0, 0, '.')
        break
      default:
        formattedValue.splice(-2, 0, '.')
        break
    }
    this.setState({
      value: {
        display: numeral(formattedValue.join('')).format('0,0.00'),
        value: numeral(penceAmount).value()
      }
    })
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  isValid = () => {
    const { value, splitWith } = this.state
    if (value > 0 && splitWith.length) {
      return true
    }
    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { actions, history } = this.props
    const { value, splitWith, title, message } = this.state
    actions.createCharge({ value, splitWith, title, message })
      .then(() => history.push('/'))
  }

  render () {
    const { user, charge } = this.props
    const { value, splitWith, title, message } = this.state

    return (
      <Paper square elevation={0}>
        <CreateForm
          disabled={!this.isValid() || charge.loading}
          value={{
            value: value.display,
            onChange: this.handleValueChange
          }}
          splitWith={{
            value: splitWith,
            onChange: this.handleChange('splitWith')
          }}
          title={{
            value: title,
            onChange: this.handleChange('title')
          }}
          message={{
            value: message,
            onChange: this.handleChange('message')
          }}
          user={{
            entities: {
              users: user.entities.users
            },
            id: user.id,
            loading: user.loading
          }}
          actions={{
            onSubmit: this.handleSubmit
          }}
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  user: {
    entities: {
      users: usersSelector(state)
    },
    id: idSelector(state),
    loading: loadingSelector(state)
  },
  charge: {
    loading: chargeLoadingSelector(state)
  }
})

const mapDispatchToProps = dispatch => ({
  actions: {
    createCharge: data => dispatch(createCharge(data)),
    getUsers: () => dispatch(getUsers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withNav(Create)))
