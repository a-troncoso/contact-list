import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import UserCard from '../UserCard'

import style from './UsersTable.scss'

const propTypes = {
  users: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onEnterRow: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired
}

class UsersTable extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`columns ${style.root}`}>
        <div className="column">
          <table className="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map((user, key) => {
                return(
                  <tr
                    key={key}
                    onMouseEnter={() => this.props.onEnterRow(user.id)}
                    onMouseLeave={() => this.props.onEnterRow(user.id)}>
                    <td>
                      <UserCard
                        data={user}
                        showRemove={user.showRemove}
                        onRemoveUser={() => this.props.onRemoveUser(user.id)}></UserCard>
                    </td>
                    <td> {user.description} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className={style.nextPage}>
            <p onClick={() => this.props.onChangePage(-1)} style={{visibility: this.props.page != 1 ? 'visible' : 'hidden' }}><i className="fa fa-arrow-circle-left has-text-primary"></i> Página anterior</p>
            <p onClick={() => this.props.onChangePage(1)} style={{visibility: this.props.users.length >= this.props.limit ? 'visible' : 'hidden' }}>Siguiente página <i className="fa fa-arrow-circle-right has-text-primary"></i></p>
          </div>
    </div>
      </div>
    );
  }
}

UsersTable.propTypes = propTypes
export default UsersTable
