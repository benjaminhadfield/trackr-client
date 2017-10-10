import React from 'react'
import { findDOMNode } from 'react-dom'
import { string, func } from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ExitToApp from 'material-ui-icons/ExitToApp'

class TitleBar extends React.Component {
  state = {
    menuOpen: false
  }

  handleAccountMenuClick = e => this.setState({
    menuOpen: true,
    anchorEl: findDOMNode(this.accountButton)
  })

  handleAccountMenuClose = () => this.setState({ menuOpen: false })

  render () {
    const { title, user, handleLogout } = this.props
    const { menuOpen, anchorEl } = this.state
    return (
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography
            type='title'
            color='inherit'
            style={{ flex: 1 }}
          >
            {title || 'Trackr'}
          </Typography>
          <Button
            color='contrast'
            ref={el => { this.accountButton = el }}
            onClick={this.handleAccountMenuClick}
          >
            {user.name || user.username}
          </Button>
          <Popover
            open={menuOpen}
            anchorEl={anchorEl}
            onRequestClose={this.handleAccountMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <List>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          </Popover>
        </Toolbar>
      </AppBar>
    )
  }
}

TitleBar.propTypes = {
  title: string,
  handleLogout: func.isRequired
}

export default TitleBar
