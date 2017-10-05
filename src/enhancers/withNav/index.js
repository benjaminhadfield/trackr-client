import React from 'react'
import { Page, Main } from '../../components/layout'
import Nav from '../../components/nav'

export default (Component) => (
  (props) => {
    const routes = ['/', '/create', '/requests']
    const navigate = (e, i) => props.history.push(routes[i])
    const selected = routes.findIndex(route => route === props.history.location.pathname)

    return (
      <Page>
        <Main>
          <Component {...props} />
        </Main>
        <Nav selected={selected} onChange={navigate} />
      </Page>
    )
  }
)
