import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalBackground,
  ModalContent,
  ModalClose,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  Field,
  Label,
  Control,
  Input,
  Button,
  Box } from 'bloomer';

  import API from '../../api'
  import style from './NewContact.scss'

  const propTypes = {
    isActive: PropTypes.bool.isRequired,
    onChangeDisplay: PropTypes.func.isRequired
  }

  class NewContact extends Component {
    constructor(props) {
      super(props)

      this.state = {
        photo: '',
        name: '',
        description: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
      const name = event.target.name
      this.setState({
        [name]: event.target.value
      })
    }

    async handleSubmit(event) {
      // console.log(this.state)
      event.preventDefault();
      try {
        await API.users.create(this.state)
      } catch (error) {
        console.error(error)
      }
    }

    render () {
      return (
        <Modal isActive={this.props.isActive} className={style.root}>
          <ModalBackground  />
          <ModalCard>
            <ModalCardHeader className={style.modalCardHeader}>
              <ModalCardTitle className={style.modalCardTitle}>Agregar nuevo contacto</ModalCardTitle>
            </ModalCardHeader>
            <ModalCardBody className={style.modalCardBody}>
              <form onSubmit={this.handleSubmit}>
                <Field>
                  <Label className={style.label}>Url imagen de perfil<span className="has-text-primary"> *</span></Label>
                  <Control>
                    <Input
                      type="text"
                      className={style.input}
                      value={this.state.photo}
                      name="photo"
                      onChange={this.handleChange}
                      required/>
                  </Control>
                </Field>
                <Field>
                  <Label className={style.label}>Nombre<span className="has-text-primary"> *</span></Label>
                  <Control>
                    <Input
                      type="text"
                      className={style.input}
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                      required/>
                  </Control>
                </Field>
                <Field>
                  <Label className={style.label}>Descripción<span className="has-text-primary"> *</span></Label>
                  <Control>
                    <Input
                      type="text"
                      className={style.input}
                      value={this.state.description}
                      name="description"
                      onChange={this.handleChange}
                      required/>
                  </Control>
                </Field>
                <Field className={style.saveField}>
                  <Button type="submit" isColor='primary' className={style.save}>Guardar</Button>
                </Field>
              </form>
            </ModalCardBody>
          </ModalCard>
          <ModalClose onClick={this.props.onChangeDisplay} />
        </Modal>
      )
    }
  }

  NewContact.propTypes = propTypes

  export default NewContact
