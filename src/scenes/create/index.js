import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'

import withAuth from '../../enhancers/withAuth'
import withNav from '../../enhancers/withNav'
import { usersSelector, loadingSelector } from '../../data/user/selectors'
import { getUsers } from '../../data/user/actions'
import { createCharge } from '../../data/charge/actions'

import CreateForm from './components/createForm'

class Create extends React.Component {
  state = {
    value: '',
    splitWith: [],
    title: '',
    message: ''
  }

  componentDidMount () {
    const { actions, user } = this.props
    if (!Object.keys(user.entities.users).length) {
      actions.getUsers()
    }
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  isValid = () => {
    const { value, title, message } = this.state
    if (value > 0) {
      return true
    }
    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { actions } = this.props
    const { value, splitWith, title, message } = this.state
    actions.createCharge({ value, splitWith, title, message })
  }

  render () {
    const { user } = this.props
    const { value, splitWith, title, message } = this.state

    return (
      <Paper square elevation={0}>
        <CreateForm
          disabled={!this.isValid()}
          value={{
            value: value,
            onChange: this.handleChange('value')
          }}
          splitWith={{
            value: splitWith,
            onChange: this.handleChange('splitWith'),
            options: Object.values(user.entities.users)
          }}
          title={{
            value: title,
            onChange: this.handleChange('title')
          }}
          message={{
            value: message,
            onChange: this.handleChange('message')
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
    loading: loadingSelector(state)
  }
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getUsers: () => dispatch(getUsers()),
    createCharge: data => dispatch(createCharge(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withNav(Create)))
