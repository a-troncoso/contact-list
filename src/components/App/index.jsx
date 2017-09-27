import React, { Component } from 'react'
import { render } from 'react-dom'

// Own components
import TableHeader from '../TableHeader'
import UsersTable from '../UsersTable'

import {Container, Title, Message, MessageBody} from 'bloomer'

import API from '../../api'
import Utils from '../../utils'
import style from './App.scss'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			users: []
		}

		this.handleEnterRow = this.handleEnterRow.bind(this)
		this.searchUsers = this.searchUsers.bind(this)
		this.handleRemoveUser = this.handleRemoveUser.bind(this)
	}

	async componentWillMount() {
		this.searchUsers('')
	}

	async searchUsers(value) {
		try {
			let users = Utils.users.formatList(await API.users.get(value))
			this.setState({
				users
			})
		} catch (error) {
			console.error(error)
		}
	}

	handleEnterRow(userId) {
		// let users = this.state.users
		// users[key].showRemove = !(users[key].showRemove)
		//
		// const user = this.state.users.find(user => {
		// 	return user === userId
		// })
		const users = this.state.users.map(user => {
			if(user.id === userId) {
				user.showRemove = !user.showRemove
			}
			return user
		})

		console.log(this.state)

		this.setState({
			users
		});
	}

	async handleRemoveUser(userId) {
		try {
			await API.users.delete(userId)
			
			let users = this.state.users.filter(user => {
				return user.id !== userId
			})
			console.log(users)
			this.setState({
				users
			})
		} catch (error) {
			console.error(error)
		}
	}

	render() {
		return (
			<Container className={`is-fullhd ${style.root}`}>
				<Title isSize={4} className={style.title}>Test <strong>Beetrack</strong> </Title>
				<TableHeader className={style.tableHeader} onChangeSearcher={this.searchUsers}></TableHeader>
				{
					this.state.users.length > 0 ? (
						<UsersTable
							users={this.state.users}
							onEnterRow={this.handleEnterRow}
							onRemoveUser={this.handleRemoveUser}
							></UsersTable>
					) : (
						<Message isColor="warning">
							<MessageBody> No se registran usuarios </MessageBody>
						</Message>
					)
				}
			</Container>
		)
	}
}

export default App
