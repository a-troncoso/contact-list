const utils = {
  users: {
    formatList(users) {
      // Check if api not fetch users
      if(Object.keys(users).length === 0 && users.constructor === Object)
        return []

      let formattedUsers = users

      if(!Array.isArray(formattedUsers)) formattedUsers = [formattedUsers]

      formattedUsers = formattedUsers.map(user => {
        user.showRemove = false
        return user
      })

      return formattedUsers
    }
  }
}

export default utils
