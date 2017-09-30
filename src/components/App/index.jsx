import React, { Component } from 'react'
import { render } from 'react-dom'

// Own components
import TableHeader from '../TableHeader'
import UsersTable from '../UsersTable'
// Third-party components
import { Container, Title, Message, MessageBody } from 'bloomer'

import API from '../../api'
import Utils from '../../utils'
import style from './App.scss'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			users: [],
			currentPage: 1,
			limit: 5
		}

		this.handleEnterRow = this.handleEnterRow.bind(this)
		this.searchUsers = this.searchUsers.bind(this)
		this.handleRemoveUser = this.handleRemoveUser.bind(this)
		this.handleAddUser = this.handleAddUser.bind(this)
		this.handleChangePage = this.handleChangePage.bind(this)
	}

	async componentWillMount() {
		this.searchUsers(this.state.currentPage, this.state.limit, '')
	}

	async searchUsers(currentPage, limit, value) {
		try {
			let users = Utils.users.formatList(await API.users.get(currentPage, limit, value))
			this.setState({ users })
		} catch (error) {
			console.error(error)
		}
	}

	handleEnterRow(userId) {
		const users = this.state.users.map(user => {
			if(user.id === userId) {
				user.showRemove = !user.showRemove
			}
			return user
		})

		this.setState({ users })
	}

	async handleRemoveUser(userId) {
		try {
			await API.users.delete(userId)
			this.searchUsers(this.state.currentPage, this.state.limit, '')
		} catch (error) {
			console.error(error)
		}
	}

	handleAddUser() {
		this.searchUsers(this.state.currentPage, this.state.limit, '')
	}

	handleChangePage(e) {
		this.setState({
			currentPage: this.state.currentPage + e
		}, () => {
			this.searchUsers(this.state.currentPage, this.state.limit, '')
		})
	}

	render() {
		return (
			<Container className={`is-fullhd ${style.root}`}>
				<Title isSize={4} className={style.title}>Test <strong>Beetrack</strong> </Title>
				<TableHeader
					className={style.tableHeader}
					onChangeSearcher={this.searchUsers}
					onAddUser={this.handleAddUser}
					></TableHeader>
				{
					this.state.users.length > 0 ? (
						<UsersTable
							users={this.state.users}
							page={this.state.currentPage}
							limit={this.state.limit}
							onEnterRow={this.handleEnterRow}
							onRemoveUser={this.handleRemoveUser}
							onChangePage={this.handleChangePage}
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
