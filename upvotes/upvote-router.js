const express = require("express")
const Upvotes = require("./upvote-model")
const authenticate = require("../issues/issues-middleware")

const router = express.Router({mergeParams: true})

// helper to get issue id# from URL instead of params
function getIssueId(baseUrl) {
    let issueUrlArray = baseUrl.split("/")
    let issueId = issueUrlArray[2]
    return issueId
}

// GET vote by USER_ID and ISSUE_ID
router.get("/", authenticate.restrict(), async (req, res, next) => {
    const issueId = getIssueId(req.baseUrl)
    const userId = req.token.subject

    try{
        const upvote = await Upvotes.findById(issueId, userId)
        if(!upvote) {
            return res.status(404).json({
                error: "User has not voted on this issue yet"
            })
        }
        res.json(upvote)
    } catch(err) {
        next(err)
    }
})

// POST new vote by ISSUE_ID and USER_ID (acts like adding an upvote)
// If a row exists (with user_id & issue_id) it equals an upvote
router.get("/vote", authenticate.restrict(), async (req, res, next) => {
    const issueId = getIssueId(req.baseUrl)
    const userId = req.token.subject

    try{
        const upvote = await Upvotes.findById(issueId, userId)

        if(upvote.length == 1) {
            return res.status(409).json({
                message: "Upvote already exists"
            })
        }
        // This part adds the upvote row
        if (upvote.length == 0) {
            const newVote = await Upvotes.add({
                user_id: userId,
                issue_id: issueId,
            });

            return res.status(201).json(newVote)
        }

    } catch(err) {
        next(err)
    }
})

// DELETE vote by ISSUE_ID and USER_ID (acts like removing an upvote)
// Deletes the given row. The row itself IS an upvote.
router.delete("/vote", authenticate.restrict(), async (req, res, next) => {
    const issueId = getIssueId(req.baseUrl)
    const userId = req.token.subject

    try{
        const upvote = await Upvotes.findById(issueId, userId)

        if (upvote.length == 0) {
            return res.status(404).json({
                error: "User has not voted on this issue yet"
            })
        }

        // This part removes the upvote row
        await Upvotes.remove(upvote[0].id)
            // This part decrements the issue's vote total
            const getVotes = await Upvotes.findVotesById(issueId)
            currentVotes = getVotes[0]['count(`issue_id`)']
            const subtractVote = {
                votes: currentVotes - 1
            }
            Issues.update(subtractVote, issueId)
        res.status(204).json({
            message: "The upvote has been removed"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router