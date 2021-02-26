import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Search({ users, getFoundUsers }) {
  const [queryString, setQueryString] = useState('')

  function search(queryString, string){
    const regular = RegExp(queryString,'i');
    return regular.test(string)
  }

  function resetCearch() {
    getFoundUsers()
  }

  function searchUsers() {
    resetCearch()
    if (queryString !== '') {
      const perPart = 50
      const total = Math.ceil(users.length / perPart)
      let start = 0
      let partUsers = users.slice(start, start + perPart)
      while (partUsers.length > 0) {
        partUsers = partUsers.filter((user) => {
          return Object.values(user).some((value) => search(queryString, value))
        })
        start += perPart
        getFoundUsers(partUsers, start < total * perPart)
        partUsers = users.slice(start, start + perPart)
      }
    }
  }

  return (
    <div className="d-flex mt-4">
      <input className="form-control form-control-sm"
              placeholder="Search users" 
              value={queryString}
              onChange={(event) => { setQueryString(event.target.value) }}
      />
      <button className="btn btn-primary btn-sm ml-4" onClick={() => searchUsers()}>Search</button>
      <button className="btn btn-danger btn-sm ml-4" onClick={() => resetCearch()}>Reset</button>
    </div>
  )
}

Search.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFoundUsers: PropTypes.func.isRequired,
}

export default Search