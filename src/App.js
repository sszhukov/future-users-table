import React, { useState } from 'react';
import './App.css';
import Table from './Components/Table/Table';
import InputData from './Components/Input/InputData';
import UserInfo from './Components/UserInfo/UserInfo';
import Loader from './Components/Loader/Loader';
import Search from './Components/Search/Search';

function App() {
  const [users, setUsers] = useState([])
  const [foundUsers, setFoundUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorLoad, setErrorLoad] = useState({ status: false, message: '' })

  function loadUsers(countRows) {
    setLoading(true)
    setErrorLoad({ status: false, message: '' })
    fetch(`
      http://www.filltesxt.com/?rows=${countRows}&id={number|1000}&
      firstName={firstName}&lastName={lastName}&email={email}&
      phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    )
      .then(response => response.json())
      .then(users => {
        setUsers(users)
        setFoundUsers([])
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setErrorLoad({
          status: true,
          message: 'Не удалось загрузить данные :\'('
        })
      })
  }

  function addUsersData(usersDara) {
    setUsers([usersDara].concat(users))
    setFoundUsers([])
    setLoading(false)
  }

  function selectUser(id) {
    setUser(users.find((user) => user.id === id))
  }

  function getFoundUsers(users, loading) {
    if (users) {
      setLoading(loading)
      setFoundUsers((prev) => prev.concat(users))
    } else {
      setFoundUsers([])
    }
  }

  function showUsers() {
    if (foundUsers.length) {
      return foundUsers
    }
    return users
  }

  return (
    <div className="App px-5 py-2">
      <header className="App-header"><h1>Тестовое здание</h1></header>
      <article>
        <InputData addUsersData={addUsersData} />

        {loading &&
          <Loader size="3rem"/>
        }

        {!loading && errorLoad.status &&
          <div className="text-danger text-center h5 my-3">{errorLoad.message}</div>
        }

        {!loading && !errorLoad.status && !!users.length &&
          <React.Fragment>
            <Search users={users} getFoundUsers={getFoundUsers}/>
            <Table users={showUsers()} selectUser={selectUser}/>
          </React.Fragment>
        }

        {user.firstName && user.lastName &&
          <UserInfo user={user} />
        }

        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-primary mr-4" onClick={() => {loadUsers(32)}}>Small bigdata</button>
          <button className="btn btn-primary" onClick={() => {loadUsers(1000)}}>Big bigdata</button>
        </div>
      </article>
    </div>
  );
}

export default App;
