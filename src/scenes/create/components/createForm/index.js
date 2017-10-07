import React from 'react'
import { shape, string, number, func, bool, arrayOf } from 'prop-types'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

const CreateForm = ({ disabled, value, title, message, splitWith, user, actions }) => {
  return (
    <form onSubmit={actions.onSubmit}>
      <Card>
        <CardContent>
          <TextField
            required
            fullWidth
            autoFocus
            label='Amount'
            type='number'
            value={value.value}
            onChange={value.onChange}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='split-with'>Split With</InputLabel>
            <Select
              required
              multiple
              value={splitWith.value}
              onChange={splitWith.onChange}
              input={<Input id='split-with' />}
            >
              {Object.values(user.entities.users)
                .filter(_user => _user.id !== user.id)
                .map(_user => {
                  const selected = splitWith.value.includes(_user.id)
                  return (
                    <MenuItem
                      key={_user.id}
                      value={_user.id}
                      style={{
                        fontWeight: selected ? 'bold' : 'normal'
                      }}
                    >
                      {_user.name || _user.username}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Title'
            value={title.value}
            onChange={title.onChange}
          />
          <TextField
            fullWidth
            label='Message'
            multiline
            rowsMax='6'
            value={message.value}
            onChange={message.onChange}
          />
        </CardContent>
        <CardActions>
          <Button raised color='primary' disabled={disabled} type='submit'>
            Create Charge
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

CreateForm.propTypes = {
  disabled: bool.isRequired,
  value: shape({
    value: number,
    onChange: func.isRequired
  }).isRequired,
  splitWith: shape({
    value: arrayOf(number).isRequired,
    onChange: func.isRequired
  }).isRequired,
  title: shape({
    value: string,
    onChange: func.isRequired
  }).isRequired,
  message: shape({
    value: string,
    onChange: func.isRequired
  }).isRequired,
  user: shape({
    entities: shape({
      users: shape().isRequired
    }).isRequired,
    id: number.isRequired,
    loading: bool.isRequired
  }).isRequired,
  actions: shape({
    onSubmit: func.isRequired
  })
}

export default CreateForm
