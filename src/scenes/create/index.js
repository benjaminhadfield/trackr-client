import React from 'react'
import { connect } from 'react-redux'
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
    value: '',
    splitWith: [],
    title: '',
    message: ''
  }

  static title = 'Create Charge'

  componentDidMount () {
    this.props.actions.getUsers()
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
            value: value,
            onChange: this.handleChange('value')
          }}
          splitWith={{
            value: splitWith,
            onChange: this.handleChange('splitWith'),
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
