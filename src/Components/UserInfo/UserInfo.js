import React from 'react'

function userInfo({user}) {
  return (
    <div className="mt-5">
      <h4>Выбран пользователь <b>{user.firstName} {user.lastName}</b></h4>
      
      { user.description &&
        <p>Описание:
          <textarea className="w-100 bg-transparent text-white" value={user.description} readOnly/>
        </p>
      }
      { user.address && user.address.streetAddress && 
        <p>Адрес проживания:&nbsp;<b>{user.address.streetAddress}</b></p>
      }
      { user.address && user.address.city &&
        <p>Город:&nbsp;<b>{user.address.city}</b></p>
      }
      { user.address && user.address.state &&
        <p>Провинция/штат:&nbsp;<b>{user.address.state}</b></p>
      }
      { user.address && user.address.zip &&
        <p>Индекс:&nbsp;<b>{user.address.zip}</b></p>
      }
    </div>
  )
}

export default userInfo