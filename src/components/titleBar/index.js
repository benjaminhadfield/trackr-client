import React from 'react'
import { string } from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const TitleBar = ({ title, user }) => (
  <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography
        type='title'
        color='inherit'
        style={{ flex: 1 }}
      >
        {title || 'Trackr'}
      </Typography>
      <Typography color='inherit'>{user.name || user.username}</Typography>
    </Toolbar>
  </AppBar>
)

TitleBar.propTypes = {
  title: string
}

export default TitleBar
