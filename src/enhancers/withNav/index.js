import React from 'react'
import { connect } from 'react-redux'

import Auth from '../../services/auth'
import { userSelector } from '../../data/user/selectors'
import { Page, Main } from '../../components/layout'
import Nav from '../../components/nav'
import TitleBar from '../../components/titleBar'

export default (Component) => {
  const WithNav = (props) => {
    const routes = ['/', '/create', '/requests']
    const navigate = (e, i) => props.history.push(routes[i])
    const selected = routes.findIndex(route => route === props.history.location.pathname)
    const handleLogout = () => {
      Auth.logout()
      props.history.push('/login')
    }

    return (
      <Page>
        <TitleBar title={Component.title} user={props.user} handleLogout={handleLogout} />
        <Main>
          <Component {...props} />
        </Main>
        <Nav selected={selected} onChange={navigate} />
      </Page>
    )
  }

  const mapStateToProps = state => ({
    user: userSelector(state)
  })

  return connect(mapStateToProps)(WithNav)
}
