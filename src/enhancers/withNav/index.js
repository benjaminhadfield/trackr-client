import React from 'react'
import { Page, Main } from '../../components/layout'
import Nav from '../../components/nav'

export default (Component) => (
  (props) => (
    <Page>
      <Main>
        <Component {...props} />
      </Main>
      <Nav />
    </Page>
  )
)
