const db = require('../data/dbConfig')

// GET all issues
function findAll() {
	return db('issues').select('id', 'title', 'description', 'city', 'state')
}

// ADD issue
async function add(issue) {
    const [id] = await db('issues').insert(issue)
    return findById(id)
}

// FIND issue by ID
function findById(id) {
    return db('issues')
        .select('id', 'title', 'description', 'city', 'state')
        .where({ id })
        .first()
}

// FIND issue by filter (title, in this case)
function findBy(filter) {
	return db('issues')
        .select('id', 'title', 'description', 'city', 'state')
		.where(filter)
}

module.exports = {
    add,
    findAll,
    findBy,
    findById
}