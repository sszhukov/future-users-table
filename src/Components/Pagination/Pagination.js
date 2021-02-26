import React from 'react'

function Pagination({page, perPage, totalElements, setPage}) {
  function toralPages() {
    return Math.ceil(totalElements / perPage)
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
      <button className="btn mr-1 btn-light" disabled={page <= 1} onClick={() => {setPage(1)}}>&lt;&lt; First</button>
      <button className="btn mr-1 btn-light" disabled={page <= 1} onClick={() => {setPage(page - 1)}}>&lt; Back</button>
      <div className="mr-1 outline-light my-auto">{page} / {toralPages()}</div>
      <button className="btn mr-1 btn-light" disabled={page >= toralPages()} onClick={() => {setPage(page + 1)}}>Next &gt;</button>
      <button className="btn btn-light" disabled={page >= toralPages()} onClick={() => {setPage(toralPages())}}>Last &gt;&gt;</button>
    </div>
  )
}

export default Pagination