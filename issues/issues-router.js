const express = require("express")
const Issues = require("./issues-model")
const authenticate = require("./issues-middleware")
const upvotesRouter = require('../upvotes/upvote-router');
// const Upvotes = require("../upvotes/upvote-model")

const router = express.Router()
router.use('/:id/upvote', upvotesRouter);

router.get("/", async (req, res, next) => {
    try{
        res.json(await Issues.findAll())
    }catch(err) {
        next(err)
    }
})

router.get("/:id", authenticate.restrict(), async (req, res, next) => {
    req.params.vish = 'vish'
    console.log('issues-router: ', req.params.vish)
    try{
        const issue = await Issues.findById(req.params.id)
        if(!issue) {
            return res.status(404).json({
                error: "Unable to find the issue with that id"
            })
        }
        res.json(issue)
        console.log('token: ', req.token)
        console.log('subject: ', req.token.subject)
    }catch(err) {
        next(err)
    }
})

router.post("/", authenticate.restrict(), async (req, res, next) => {
    try{
        const { title, description, city, state } = req.body
        const issue= await Issues.findBy({ title }).first()

        if(issue) {
            return res.status(409).json({
                message: "issue already exists"
            })
        }
        const newIssue= await Issues.add({
            title,
            description,
            city,
            state
        })
        res.status(201).json(newIssue)
    }catch(err) {
        next(err)
    }
})

router.put("/:id", authenticate.restrict(), async (req, res, next) => {
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

        const updateThisIssue = await Issues.findById(req.params.id)
            if(issue) {
                Issues.update(issue, req.params.id).then(updatedIssue => {
                    Issues.findById(req.params.id).then(updatedIssue => {
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
    }catch(err) {
        next(err)
    }
})

router.delete("/:id", authenticate.restrict(), async (req, res, next) => {
    try{
        await Issues.remove(req.params.id)
        res.status(204).json({
            message: "The issue has been removed"
        })
    }catch (err) {
        next(err)
    }
})

// UPVOTES

// // GET all upvotes
// router.get("/:id/upvote/all", async (req, res, next) => {
//     console.log(req.params.vish)
//     try{
//         res.json(await Upvotes.findAll())
//     } catch(err) {
//         next(err)
//     }
// })

// // GET upvote for ISSUE by ID
// router.get("/:id/upvote", async (req, res, next) => {
//     // const upvoteId = getUpvoteId(req.baseUrl)
//     try{
//         const upvote = await Upvotes.findById(req.params.id)
//         if(!upvote) {
//             return res.status(404).json({
//                 error: "User has not voted on this issue yet"
//             })
//         }
//         res.json(upvote)
//     } catch(err) {
//         next(err)
//     }
// })

// // POST new vote for ISSUE by ID
// router.post("/:id/upvote", authenticate.restrict(), async (req, res, next) => {
//     console.log('token: ', req.token)
//     console.log('subject: ', req.token.subject)    
//     // const upvoteId = getUpvoteId(req.baseUrl)
//     const userId = req.token.subject
//     try{
//         const { vote } = req.body
//         // const issue = await Upvotes.findBy({ title }).first()
//         const upvote = await Upvotes.findById(req.params.id)

//         if(upvote) {
//             return res.status(409).json({
//                 message: "upvote already exists"
//             })
//         }

//         const newVote= await Upvotes.add({
//             user_id: userId,
//             issue_id: req.params.id,
//             vote: vote
//         })
//         res.status(201).json(newVote)
//     } catch(err) {
//         next(err)
//     }
// })

module.exports = router