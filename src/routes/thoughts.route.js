import {Router} from 'express'
const router = Router()

import {createThoughts, findAllThoughts, findById, topThought, searchByTitle, byUser, update, erase, likeThought, addComment, deleteComment} from '../controllers/thoughts.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'



router.post("/",   authMiddleware, createThoughts)
router.get("/" ,  findAllThoughts)
router.get("/top", topThought)
router.get("/search", searchByTitle)
router.get("/byUser" , authMiddleware, byUser)
router.get("/:id", authMiddleware, findById)
router.patch("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, erase)
router.patch("/like/:id", authMiddleware, likeThought)
router.patch("/comment/:id", authMiddleware, addComment)
router.patch("/comment/:idThought/:idComment", authMiddleware, deleteComment)


export default router