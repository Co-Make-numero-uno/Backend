const db = require('../data/dbConfig')

// GET all upvotes
function findAll() {
	return db('upvote').select('id', 'user_id', 'issue_id', 'vote')
}

// GET issue's upvote total by ID
function findVotesById(issueId) {
    return db('upvote')
        .count('issue_id').where('issue_id', issueId)
}

// ADD upvote
async function add(vote) {
    const [id] = await db('upvote').insert(vote)
    return vote
}

// FIND upvote by ID
function findById(issueId, userId) {
    return db('upvote')
        .where('issue_id', issueId)
        .andWhere('user_id', userId)
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
    findVotesById,
    remove
}