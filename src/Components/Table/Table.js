import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Pagination from '../Pagination/Pagination';

function Table({ users, selectUser }) {
  useEffect(() => {
    setUsers([...users])
    setPage(1)
  }, [users])

  const [currentUsers, setUsers] = useState([...users])
  const [fieldForSort, setFieldForSort ] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(50)

  function usersOnPage() {
    const ofset = (page - 1) * perPage
    return currentUsers.slice(ofset, ofset + perPage)
  }

  function sorting(fieldName) {
    if (fieldForSort !== fieldName) {
      setFieldForSort(fieldName)

      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });

      setUsers(currentUsers.slice(0).sort((a, b) => collator.compare(a[fieldName], b[fieldName])))
    } else {
      setUsers(currentUsers.slice(0).reverse())
    }
  }

  return (
    <React.Fragment>
      {usersOnPage().length > 0 &&
        <table className="mt-3 d-flex flex-column ml-4">
          <thead>
            <tr className="row">
              <th className="col-1 btn text-muted text-left" onClick={() => sorting('id')}>ID</th>
              <th className="col-2 btn text-muted text-left" onClick={() => sorting('firstName')}>First name</th>
              <th className="col-2 btn text-muted text-left" onClick={() => sorting('lastName')}>Last name</th>
              <th className="col-4 btn text-muted text-left" onClick={() => sorting('email')}>Your email</th>
              <th className="col-3 btn text-muted text-left" onClick={() => sorting('phone')}>Your phone</th>
            </tr>
          </thead>
          <tbody>
            {usersOnPage().map((user, userIndex) => { return (
              <tr className="row" key={userIndex} onClick={() => selectUser(user.id)}>
                <th className="col-1">{user.id}</th>
                <th className="col-2">{user.firstName}</th>
                <th className="col-2">{user.lastName}</th>
                <th className="col-4">{user.email}</th>
                <th className="col-3">{user.phone}</th>
              </tr>
            )})}
          </tbody>
        </table>
      }
      {users.length > perPage &&
        <Pagination page={page} perPage={perPage} totalElements={users.length} setPage={setPage}/>
      }
    </React.Fragment>
  )
};

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser:PropTypes.func,
}

export default Table