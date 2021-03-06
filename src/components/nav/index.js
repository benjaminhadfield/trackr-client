import React from 'react'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import Charges from 'material-ui-icons/AttachMoney'
import Add from 'material-ui-icons/Add'
import Sent from 'material-ui-icons/PresentToAll'

const Nav = ({ selected, onChange }) => (
  <BottomNavigation
    showLabels
    value={selected}
    onChange={onChange}
  >
    <BottomNavigationButton label='Charges' icon={<Charges />} />
    <BottomNavigationButton label='Create New' icon={<Add />} />
    <BottomNavigationButton disabled label='Sent' icon={<Sent />} />
  </BottomNavigation>
)

export default Nav
