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
      <div>
        len:
        {Object.values(user.entities.users)
          .filter(_user => _user.id !== user.id).length}
      </div>
      <div>{user.loading ? 'loading' : 'done'}</div>
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
              native
              value={splitWith.value}
              onChange={splitWith.onChange}
              input={<Input id='split-with' />}
            >
              <option value=''>-</option>
              {Object.values(user.entities.users)
                .filter(_user => _user.id !== user.id)
                .map(_user => {
                  const selected = splitWith.value === _user.id
                  return (
                    <option
                      key={_user.id}
                      value={_user.id}
                      // style={{
                      //   fontWeight: selected ? 'bold' : 'normal'
                      // }}
                    >
                      {_user.name || _user.username}
                    </option>
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
    value: string,
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
