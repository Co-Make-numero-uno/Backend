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

// DELETE issue by ID
function remove(id) {
    return db('issues')
        .where('issues.id', id)
        .del()
}

// PUT / UPDATE issue
function update(changes, id) {
    return db('issues')
        .where('issues.id', id)
        .update(changes)
}

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove,
    update
}