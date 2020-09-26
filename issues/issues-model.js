const db = require('../data/dbConfig')

// GET all issues
function findAll() {
    // return db.raw(`
    //     SELECT issues.id, title, description, city, state, COUNT(upvote.id) AS votes FROM issues
    //     LEFT JOIN upvote
    //     ON upvote.issue_id = issues.id
    //     GROUP BY issues.id
    // `)
    return db('issues')
        .select('issues.id', 'title', 'description', 'city', 'state',)
        .leftJoin("upvote", "upvote.issue_id", "issues.id")
        .count('upvote.id as votes')
        .groupBy('issues.id');
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

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove,
    update
}