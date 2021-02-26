import React from 'react'

function Loader({ size }) {
  const style = {
    loaderSize: {
      width: size,
      height: size,
    }
  }

  return (
    <div className="d-flex my-3 justify-content-center">
      <div className="spinner-border mr-2" style={style.loaderSize} role="status">
      </div>
      <span className="visually-hidden d-flex align-items-center">Loading...</span>
    </div>
  )
}

export default Loader