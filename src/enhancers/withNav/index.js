import React from 'react'
import { connect } from 'react-redux'
import { userSelector } from '../../data/user/selectors'
import { Page, Main } from '../../components/layout'
import Nav from '../../components/nav'
import TitleBar from '../../components/titleBar'

export default (Component) => {
  const WithNav = (props) => {
    const routes = ['/', '/create', '/requests']
    const navigate = (e, i) => props.history.push(routes[i])
    const selected = routes.findIndex(route => route === props.history.location.pathname)

    return (
      <Page>
        <TitleBar title={Component.title} user={props.user} />
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
