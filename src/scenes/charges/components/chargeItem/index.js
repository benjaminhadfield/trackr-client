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
    const { value, title, message, chargeDate, splitWith, isPaid, createdBy } = this.props
    const { open } = this.state

    console.log(splitWith, splitWith.length)
    const formattedValue = numeral(value / 100).format('0,0.00')
    const formattedSplitValue = numeral(value / splitWith.length / 100).format('0,0.00')
    const chargeDateMoment = moment(chargeDate)

    return (
      <div>
        <ListItem button divider onClick={this.toggleOpen}>
          <ListItemIcon>
            {isPaid ? <Paid style={green} /> : <Unpaid style={amber} />}
          </ListItemIcon>
          <ListItemText
            primary={'£' + formattedSplitValue}
            secondary={chargeDateMoment.fromNow()}
          />
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
          <ListItem divider style={{ background: '#f6f7f8' }}>
            <Grid container direction='column'>
              <Grid item>
                <Typography>Sent by <strong>{createdBy}</strong> on <strong>{chargeDateMoment.format('ddd, Do MMMM YYYY')}</strong>.</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Full Amount</Typography>
                <Typography>£{formattedValue}</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Title</Typography>
                <Typography>{title || '-'}</Typography>
              </Grid>
              <Grid item>
                <Typography type='caption'>Message</Typography>
                <Typography>{message || '-'}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Collapse>
      </div>
    )
  }
}

export default ChargeItem
