import React, { useState } from 'react'
import Modal from 'components/Modal'
import Dropdown from 'components/Dropdown'

import { useActions } from 'features/modal'
import { useActions as useUsersActions } from 'features/users'

const AddUserModal = () => {
  const { createUser } = useUsersActions()
  const { closeModal } = useActions()

  const [addUserEmail, setAddUserEmail] = useState('')
  const [addUserRole, setAddUserRole] = useState(null)

  const handleAddUserEmail = e => {
    setAddUserEmail(e.target.value)
  }

  const handleAddUser = () => {
    const userObject = {
      firstName: addUserEmail,
      lastName: '',
      email: addUserEmail,
    }
    const admin = addUserRole.value === 'admin'
    createUser(userObject, admin)
  }

  return (
    <Modal
      title='Add New User'
      type='create'
      customButtonText='Add User'
      action={handleAddUser}
      respond={closeModal}
    >
      <label style={{ marginBottom: '34px' }} htmlFor='add-user-email'>
        Email
        <input
          id='add-user-email'
          type='email'
          onChange={e => handleAddUserEmail(e)}
          value={addUserEmail}
        />
      </label>
      <label htmlFor='add-user-role'>
        Select role
        <Dropdown
          options={[
            { value: 'standardUser', label: 'Standard User' },
            { value: 'admin', label: 'Admin' },
          ]}
          onChange={e => setAddUserRole(e)}
          value={addUserRole}
          isFixed
        />{' '}
      </label>
    </Modal>
  )
}

export default AddUserModal
