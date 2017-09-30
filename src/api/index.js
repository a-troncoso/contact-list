const baseURL = 'http://localhost:3000'

const API = {
  users: {
    async get(currentPage, limit, q) {
      const response = await fetch(`${baseURL}/api/users?_page=${currentPage}&_limit=${limit}&q=${q}`)
      const data = await response.json()
      return data
    },
    async create(newUser) {
      const payload = {
        name: newUser.name,
        description: newUser.description,
        photo: newUser.photo
      }

      const response = await fetch(`${baseURL}/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      return data
    },
    async delete(id) {
      const response = await fetch(`${baseURL}/api/users/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      return data
    }
  }
}

export default API
