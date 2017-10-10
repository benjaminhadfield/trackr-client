import React from 'react'
import { connect } from 'react-redux'

import Auth from '../../services/auth'
import { loadingSelector, errorSelector, userSelector } from '../../data/user/selectors'
import { getToken, getCurrentUser } from '../../data/user/actions'

import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount () {
    const { history } = this.props
    if (Auth.isLoggedIn()) {
      history.replace('/')
    }
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  cleanUsername = username => username.toLowerCase().trim()

  handleSubmit = (e) => {
    e.preventDefault()
    const { actions, history } = this.props
    const { username, password } = this.state
    actions.getToken(this.cleanUsername(username), password)
      .then(({ error, payload }) => {
        if (error) {
          this.setState({ error })
        } else {
          Auth.saveToken(payload.token)
          console.log(this.props.user.all.token)
          history.push('/')
        }
      })
  }

  render () {
    const { user } = this.props
    const { username, password } = this.state

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={6000}
          open={user.error}
          message={<span>Incorrect username or password.</span>}
        />
        <Grid container align='center' justify='center' style={{ height: '100vh' }}>
          <form onSubmit={this.handleSubmit}>
            <Card>
              <CardContent>
                <Grid container direction='column'>
                  <TextField
                    fullWidth
                    id='username'
                    label='Username'
                    onChange={this.handleChange('username')}
                  />
                  <TextField
                    fullWidth
                    id='password'
                    label='Password'
                    type='password'
                    onChange={this.handleChange('password')}
                  />
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  raised
                  type='submit'
                  color='primary'
                  disabled={!(username && password) || user.loading}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: {
    all: userSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state)
  }
})

const mapDispatchToProps = dispatch => ({
  actions: {
    getToken: (username, password) => dispatch(getToken(username, password)),
    getCurrentUser: () => dispatch(getCurrentUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
