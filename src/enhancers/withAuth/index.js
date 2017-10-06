import React from 'react'
import { connect } from 'react-redux'
import Auth from '../../services/auth'
import { tokenSelector } from '../../data/user/selectors'
import { setToken } from '../../data/user/actions'

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
      const { _setToken, _auth } = this.props
      this.setState({ authenticated: true })
      if (!_auth.token) {
        _setToken(Auth.getToken())
      }
    }

    render () {
      const { authenticated } = this.state
      return authenticated ? <Component {...this.props} /> : <div />
    }
  }

  const mapStateToProps = state => ({
    _auth: {
      token: tokenSelector(state)
    }
  })

  const mapDispatchToProps = dispatch => ({
    _setToken: token => dispatch(setToken(token))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth)
}
