import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, MediaLeft, MediaContent, Image } from 'bloomer'

import style from './UserCard.scss'

const propTypes = {
  data: PropTypes.object.isRequired,
  showRemove: PropTypes.bool.isRequired,
  onRemoveUser: PropTypes.func.isRequired
}

class UserCard extends Component {

  constructor(props) {
    super(props)

    this.onPressRemoveUser = this.onPressRemoveUser.bind(this)
  }

  onPressRemoveUser() {
    this.props.onRemoveUser()
  }

  render () {
    return (
      <Media className={style.root}>
        <MediaLeft>
          <Image className={style.image} isSize='48x48' src={this.props.data.photo} />
        </MediaLeft>
        <MediaContent className={style.userName}>
          <p>{this.props.data.name}</p>
          <button
            className={`has-text-primary button ${style.remove}`}
            style={{visibility: this.props.showRemove ? 'visible' : 'hidden' }}
            onClick={this.onPressRemoveUser}
            >Eliminar</button>
        </MediaContent>
      </Media>
    )
  }
}

UserCard.propTypes = propTypes
export default UserCard
