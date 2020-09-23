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

// get issue id# from URL instead of params
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

// POST new vote to issue by ID
router.post("/", authenticate.restrict(), async (req, res, next) => {
    console.log(req.token)
    const upvoteId = getUpvoteId(req.baseUrl)
    const userId = req.token.subject
    try{
        const { vote } = req.body
        // const issue = await Upvotes.findBy({ title }).first()
        const upvote = await Upvotes.findById(upvoteId)

        if(upvote) {
            return res.status(409).json({
                message: "upvote already exists"
            })
        }
        const newVote= await Upvotes.add({
            user_id: userId,
            issue_id: upvoteId,
            vote: vote
        })
        res.status(201).json(newVote)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try{
        const issue = await req.body

        if (
            !issue.title ||
            !issue.description ||
            !issue.city ||
            !issue.state
        ) {
            return res.status(404).json({
                message: "Please enter all required fields"
            })
        }

        const updateThisIssue = await Upvotes.findById(req.params.id)
            if(issue) {
                Upvotes.update(issue, req.params.id).then(updatedIssue => {
                    Upvotes.findById(req.params.id).then(updatedIssue => {
                        res.status(200).json({
                            message: "Issue has been successfully update", 
                            updatedIssue
                        })
                    })
                })
            } else {
                return res.status(404).json({
                    message: "Issue with that id could not be found"
                })
            }
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        await Upvotes.remove(req.params.id)
        res.status(204).json({
            message: "The issue has been removed"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router