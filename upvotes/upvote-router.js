const express = require("express")
const Upvotes = require("./upvote-model")
const authenticate = require("../issues/issues-middleware")

const router = express.Router({mergeParams: true})

// GET all votes for all issues
router.get("/all", async (req, res, next) => {
    console.log(req.params.vish)
    try{
        res.json(await Upvotes.findAll())
    } catch(err) {
        next(err)
    }
})

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
router.get("/vote", authenticate.restrict(), async (req, res, next) => {
    const issueId = getIssueId(req.baseUrl)
    const userId = req.token.subject
    // const vote = req.body.vote

    // console.log('router: issueID, userID, vote: ', issueId, userId)

    try{
        const upvote = await Upvotes.findById(issueId, userId)
        console.log('upvote: ', upvote)

        if (upvote.length == 0) {
            console.log('if empty: ', upvote)
            const newVote = await Upvotes.add({
                user_id: userId,
                issue_id: issueId,
                // vote: vote
            })
            // console.log('newVote: ', newVote)
            return res.status(201).json(newVote)
        }

        if(upvote !== []) {
            console.log('if not empty: ', upvote)
            return res.status(409).json({
                message: "Upvote already exists"
            })
        }

    } catch(err) {
        next(err)
    }
})

// DELETE vote by ISSUE_ID and USER_ID (acts like removing an upvote)
router.delete("/", authenticate.restrict(), async (req, res, next) => {
    const issueId = getIssueId(req.baseUrl)
    const userId = req.token.subject

    try{
        const upvote = await Upvotes.findById(issueId, userId)
        // console.log('upvote: ', upvote)
        // console.log('upvote ID: ', upvote[0].id)

        await Upvotes.remove(upvote[0].id)
        res.status(204).json({
            message: "The issue has been removed"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router