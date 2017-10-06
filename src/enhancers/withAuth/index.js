import React from 'react'
import { connect } from 'react-redux'
import Auth from '../../services/auth'
import { tokenSelector, idSelector, usersSelector } from '../../data/user/selectors'
import { setToken, getUsers, getCurrentUser } from '../../data/user/actions'

export default (Component) => {
  class WithAuth extends React.Component {
    state = {
      authenticated: false
    }

    componentDidMount () {
      Auth.isLoggedIn()
        ? this.authenticated()
        : this.props.history.replace('/login')
    }

    authenticated = () => {
      const { _actions, _auth } = this.props
      if (!_auth.token) _actions.setToken(Auth.getToken())
      if (!_auth.id) _actions.getCurrentUser()
      if (!Object.keys(_auth.users).length) _actions.getUsers()
      this.setState({ authenticated: true })
    }

    render () {
      const { authenticated } = this.state
      return authenticated ? <Component {...this.props} /> : <div />
    }
  }

  const mapStateToProps = state => ({
    _auth: {
      token: tokenSelector(state),
      id: idSelector(state),
      users: usersSelector(state)
    }
  })

  const mapDispatchToProps = dispatch => ({
    _actions: {
      setToken: token => dispatch(setToken(token)),
      getCurrentUser: () => dispatch(getCurrentUser()),
      getUsers: () => dispatch(getUsers())
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth)
}
