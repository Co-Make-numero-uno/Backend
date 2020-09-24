const db = require('../data/dbConfig')

// GET all upvotes
function findAll() {
	return db('upvote').select('id', 'user_id', 'issue_id', 'vote')
}

// ADD upvote
async function add(vote) {
    const [id] = await db('upvote').insert(vote)
    // return findById(id)
    return vote
}

// FIND upvote by ID
function findById(issueId, userId) {
    console.log('model: issue & user IDs: ', issueId, userId)
    return db('upvote')
        // .select('id', 'user_id', 'issue_id', 'vote')
        .where('issue_id', issueId)
        .andWhere('user_id', userId)
        // .first()
}

// DELETE issue by ID
function remove(id) {
    return db('upvote')
        .where('id', id)
        .del()
}

module.exports = {
    add,
    findAll,
    findById,
    remove
}