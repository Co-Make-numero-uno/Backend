const db = require('../data/dbConfig')

// GET all upvotes
function findAll() {
	return db('upvote').select('id', 'user_id', 'issue_id', 'vote')
}

// ADD upvote
async function add(vote) {
    const [id] = await db('upvote').insert(vote)
    return findById(id)
}

// FIND upvote by ID
function findById(issueId, userId) {
    console.log('IDs: ', issueId, userId)
    return db('upvote')
        .select('id', 'user_id', 'issue_id', 'vote')
        .where('issue_id', issueId)
        .andWhere('user_id', userId)
        .first()
}

// FIND issue by filter (title, in this case)
function findBy(filter) {
	return db('upvote')
        .select('id', 'title', 'description', 'city', 'state')
		.where(filter)
}

// DELETE issue by ID
function remove(id) {
    return db('upvote')
        .where('issues.id', id)
        .del()
}

// PUT / UPDATE issue
function update(changes, id) {
    return db('upvote')
        .where('id', id)
        .update(changes)
        .then(findById(id))
}

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove,
    update
}