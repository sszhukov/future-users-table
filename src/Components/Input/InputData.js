import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SimpleReactValidator from 'simple-react-validator';
import './inputData.css';

function InputData({ addUsersData }) {
  const [showInputs, setShowInputs] = useState(false)
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const simpleValidator = React.useRef(new SimpleReactValidator({
    autoForceUpdate: {
      forceUpdate,
    },
    validators: {
      alphaWithCyrillic: {
        message: 'The alpha space may only contain letters and spaces.',
        rule: (val, params, validator) => {
          return validator.helpers.testRegex(val, /^[a-z а-я]/i)
        },
      }
    }
  }))
  
  function setValue(field, value) {
    setData((prev) => {
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  function clear() {
    setData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    })
  }

  function showInputFields() {
    setShowInputs(!showInputs)
    clear()
    simpleValidator.current.hideMessages();
  }

  function submitForm(event) {
    event.preventDefault()
    console.log(simpleValidator)

    if (simpleValidator.current.allValid()) {
      addUsersData(data)
      showInputFields()
      clear()
    } else {
      simpleValidator.current.showMessages();
    }
  }

  return (
    <React.Fragment>
      <form className={`needs-validation mt-2 ${showInputs ? '' : 'd-none'}`} noValidate onSubmit={submitForm}>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="id" className="form-label">ID</label>
            <input id="id"
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="12345"
                  value={data.id}
                  onChange={(event) => setValue('id', event.target.value.replace(/[^\d]/g, ''))}
                  onBlur={() => { simpleValidator.current.showMessageFor('id') }}
            />
            {simpleValidator.current.message('id', data.id, 'required|numeric|max:5,string', { className: 'text-danger small-text' })}
          </div>

          <div className="col mb-3">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input id="firstName"
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Vasya"
                  value={data.firstName}
                  onChange={(event) => setValue('firstName', event.target.value.replace(/[^a-z а-я]/ig, ''))}
                  onBlur={() => { simpleValidator.current.showMessageFor('firstName') }}
            />
            {simpleValidator.current.message('firstName', data.firstName, 'required|alphaWithCyrillic', { className: 'text-danger small-text' })}
          </div>

          <div className="col mb-3">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input id="lastName"
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Petrov"
                  value={data.lastName}
                  onChange={(event) => setValue('lastName', event.target.value.replace(/[^a-z а-я]/ig, ''))}
                  onBlur={() => { simpleValidator.current.showMessageFor('lastName') }}
            />
            {simpleValidator.current.message('lastName', data.lastName, 'required|alphaWithCyrillic', { className: 'text-danger small-text' })}
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="email" className="form-label">Your email</label>
            <input id="email"
                  className="form-control form-control-sm"
                  type="email"
                  placeholder="vaSYA.Petrov@petroff.com"
                  value={data.email}
                  onChange={(event) => setValue('email', event.target.value)}
                  onBlur={() => { simpleValidator.current.showMessageFor('email') }}
            />
            {simpleValidator.current.message('email', data.email, 'required|email', { className: 'text-danger small-text' })}
          </div>

          <div className="col mb-3">
            <label htmlFor="phone" className="form-label">Your phone</label>
            <input id="phone"
                  className="form-control form-control-sm"
                  type="phone"
                  placeholder="vaSYA.Petrov@petroff.com"
                  value={data.phone}
                  onChange={(event) => setValue('phone', event.target.value)}
                  onBlur={() => { simpleValidator.current.showMessageFor('phone') }}
            />
            {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger small-text' })}
          </div>

          <div className="col mb-3">
            <label className="form-label">&nbsp;</label>
            <button type="submit" className="btn btn-success btn-sm btn-block">Save</button>
          </div>
        </div>
      </form>

      <button type="submit" className="btn btn-primary btn-sm btn-block my-3" onClick={() => showInputFields()}>
        {showInputs ? "Hide" : "Show" } input panel
      </button>
    </React.Fragment>
  )
}

InputData.propTypes = {
  addUsersData: PropTypes.func
}

export default InputData