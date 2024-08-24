const TableUser = (props) => {
  const { listUser, handleClickBtnUpdate } = props

  return (
    <>
      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Username</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className='btn btn-secondary'>View</button>
                    <button
                      className='btn btn-warning mx-3'
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              )
            })
          }
          {listUser && listUser.length === 0 &&
            <tr>
              <td colSpan={4}>Not found user</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default TableUser
