import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Own components
import NewContact from '../NewContact'
// Third-party components
import { Columns, Column } from 'bloomer'
// Styles
import style from './TableHeader.scss'

const propTypes = {
  onChangeSearcher: PropTypes.func.isRequired
}

class TableHeader extends Component {
  constructor() {
    super()

    this.state = {
      searcherValue: '',
      showNewContact: false
    }

    this.showNewContact = this.showNewContact.bind(this)
    this.onChangeSearcher = this.onChangeSearcher.bind(this)
  }

  showNewContact() {
    this.setState({
      showNewContact: !this.state.showNewContact
    })
  }

  onChangeSearcher(event) {
    // console.log(event.target.value)
    this.setState({
      searcherValue: event.target.value
    })

    this.props.onChangeSearcher(event.target.value)
  }

  render() {
    return (
      <Columns className={style.root} >
        <Column isSize="1/4">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Buscar contacto..."
                value={this.state.searcherValue}
                onChange={this.onChangeSearcher} />
              <span className="icon is-small is-left has-text-primary"> <i className="fa fa-search"></i> </span>
            </div>
          </div>
        </Column>
        <Column isSize="narrow">
          <a className="button is-primary" onClick={this.showNewContact}>
            <span className="icon">
              <i className="fa fa-plus-circle"></i>
            </span>
            <span>Nuevo Contacto</span>
          </a>
        </Column>
        <NewContact isActive={this.state.showNewContact} onChangeDisplay={this.showNewContact}></NewContact>
      </Columns>
    )
  }
}

TableHeader.propTypes = propTypes
export default  TableHeader
