import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import numeral from 'numeral'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Pending from 'material-ui-icons/ExpandLess'
import Unpaid from 'material-ui-icons/AttachMoney'
import Paid from 'material-ui-icons/Check'

const green = {
  color: '#2ecc71'
}

const amber = {
  color: '#f39c12'
}

const blue = {
  color: '#815fff'
}

class ChargeItem extends React.Component {
  state = { open: false }

  toggleOpen = () => this.setState(prevState => ({ open: !prevState.open }))

  render () {
    const { charge, user, actions } = this.props
    const { open } = this.state

    const userOwnsCharge = charge.createdBy === user.id
    const formattedValue = numeral(charge.value / 100).format('0,0.00')
    const formattedSplitValue = numeral(charge.value / (charge.splitWith.length) / 100).format('0,0.00')
    const chargeDateMoment = moment(charge.chargeDate)
    const formattedCreatedBy = user.entities.users[charge.createdBy] || {}

    return (
      <div>
        <ListItem button divider onClick={this.toggleOpen}>
          <ListItemIcon>
            {charge.isPaid
              ? <Paid style={green} />
              : userOwnsCharge ? <Pending style={blue} /> : <Unpaid style={amber} />
            }
          </ListItemIcon>
          <ListItemText
            primary={'£' + formattedSplitValue}
            secondary={chargeDateMoment.fromNow()}
          />
          {
            userOwnsCharge
              ? (
                <ListItemSecondaryAction>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={charge.isPaid}
                          disabled={charge.isPaid}
                          onChange={() => actions.markAsPaid(charge.id)}
                        />
                      }
                      label={charge.isPaid ? 'Paid' : 'Mark as paid'}
                    />
                  </FormGroup>
                </ListItemSecondaryAction>
              )
              : null
          }
        </ListItem>

        <Collapse
          unmountOnExit
          in={open}
          transitionDuration='auto'
        >
          <ListItem divider style={{ background: '#f6f7f8' }}>
            <Grid container direction='column'>
              <Grid item>
                <Typography>Sent by <strong>{formattedCreatedBy.name || formattedCreatedBy.username}</strong> on <strong>{chargeDateMoment.format('ddd, Do MMMM YYYY')}</strong>.</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Full Amount</Typography>
                <Typography>£{formattedValue}</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Title</Typography>
                <Typography>{charge.title || '-'}</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Message</Typography>
                <Typography>{charge.message || '-'}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Collapse>
      </div>
    )
  }
}

export default ChargeItem
