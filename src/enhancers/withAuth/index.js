import React from 'react'
import { connect } from 'react-redux'
import Auth from '../../services/auth'
import { tokenSelector, idSelector, usersSelector, authenticatedAtSelector } from '../../data/user/selectors'
import { setToken, setUser, getUsers, getCurrentUser } from '../../data/user/actions'

export default (Component) => {
  class WithAuth extends React.Component {
    state = {
      authenticated: false
    }

    static checkInterval = 15 * 60 * 1000  // 15 minutes

    componentDidMount () {
      Auth.isLoggedIn()
        ? this.check()
        : this.props.history.replace('/login')
    }

    check = () => {
      const { _actions, _auth, history } = this.props
      // At this point we have * some * token in local-storge.
      // Hydrate token to state from local-storage if needed.
      if (!_auth.token) _actions.setToken(Auth.getToken())
      // If user was authenticated recently, then assume they are still authenticated.
      if (_auth.authenticatedAt && _auth.authenticatedAt > Date.now() - WithAuth.checkInterval) {
        return this.authenticate()
      }
      // Check the saved token is still valid, otherwise redirect to login.
      _actions.getCurrentUser()
        .then(({ error, payload }) => {
          if (error) {
            Auth.logout()
            history.push('/login')
          } else {
            Auth.saveUser(payload.result)
            // Rehydrate state from local storage if no user info.
            if (!_auth.id) _actions.setUser(Auth.getUser())
            // Get list of all users if current list is empty.
            if (!Object.keys(_auth.users).length) _actions.getUsers()
            this.authenticate()
          }
        })
    }

    authenticate = () => this.setState({ authenticated: true })

    render () {
      const { authenticated } = this.state
      return authenticated ? <Component {...this.props} /> : <div />
    }
  }

  const mapStateToProps = state => ({
    _auth: {
      token: tokenSelector(state),
      authenticatedAt: authenticatedAtSelector(state),
      id: idSelector(state),
      users: usersSelector(state)
    }
  })

  const mapDispatchToProps = dispatch => ({
    _actions: {
      setToken: token => dispatch(setToken(token)),
      setUser: user => dispatch(setUser(user)),
      getCurrentUser: () => dispatch(getCurrentUser()),
      getUsers: () => dispatch(getUsers())
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth)
}
