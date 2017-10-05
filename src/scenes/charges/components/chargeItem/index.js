import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Unpaid from 'material-ui-icons/AttachMoney'
import Paid from 'material-ui-icons/Check'

const green = {
  color: '#2ecc71'
}

const amber = {
  color: '#f39c12'
}

class ChargeItem extends React.Component {
  state = { open: false }

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }))

  render () {
    const { value, title, chargeDate, isPaid } = this.props
    const { open } = this.state

    const formattedValue = numeral(value / 100).format('0,0.00')

    return (
      <div>
        <ListItem button onClick={this.toggleOpen}>
          <ListItemIcon>
            {isPaid ? <Paid style={green} /> : <Unpaid style={amber} />}
          </ListItemIcon>
          <ListItemText primary={'£ ' + formattedValue} />
          <ListItemSecondaryAction>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={true}
                    disabled={isPaid}
                    onChange={console.log}
                  />
                }
                label='Sent'
              />
            </FormGroup>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse
          unmountOnExit
          in={open}
          transitionDuration='auto'
        >
          <ListItem>
            <ListItemText primary={title} />
          </ListItem>
        </Collapse>
      </div>
    )
  }
}

export default ChargeItem
