const users = []

class User {
	constructor(id, username, password) {
		this.id = id
		this.username = username
		this.password = password
	}

	static async findById(id) {
		return users.find((user) => user.id === id) || null
	}

	static async findByUsername(username) {
		return users.find((user) => user.username === username) || null
	}

	static async createUser(username, password) {
		const id = users.length + 1
		const user = new User(id, username, password)
		users.push(user)
		return user
	}
}

module.exports = User
