const db = require('../data/dbConfig')

// GET all issues
function findAll() {
    return db('issues')
        // .join('upvote', 'issues.id', 'upvote.issue_id')
        .select('issues.id', 'title', 'description', 'city', 'state', 'votes')
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
        .where('id', id)
        .update(changes)
        .then(findById(id))
}

// // GET issue's upvote total by ID
// function findVotesById(id) {
//     return db('issues')
//         .count('votes')
//         .where('id', id)
// }

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove,
    update
}