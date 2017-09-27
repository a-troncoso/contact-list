import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import UserCard from '../UserCard'

import style from './UsersTable.scss'

const propTypes = {
  onEnterRow: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  onRemoveUser: PropTypes.func.isRequired
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
        </div>
      </div>
    );
  }
}

UsersTable.propTypes = propTypes
export default UsersTable
