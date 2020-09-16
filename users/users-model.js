const db = require('../data/dbConfig')

// GET all users
function findAll() {
	return db('users').select('id', 'name', 'email', 'city', 'state')
}

// ADD user
async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

// FIND user by ID
function findById(id) {
    return db('users')
        .select('id', 'name')
        .where({ id })
        .first()
}

// FIND user by filter (name, in this case)
function findBy(filter) {
	return db('users')
		.select('id', 'name', 'email')
		.where(filter)
}

// DELETE user by ID
function remove(id) {
    return db('users')
        .where('users.id', id)
        .del()
}

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove
}