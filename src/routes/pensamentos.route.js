import {Router} from 'express'
const router = Router()

import {createPensamentos, findAllPensamentos, findById, topPensamento, searchByTitle, byUser, update} from '../controllers/pensamentos.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


router.post("/", authMiddleware, createPensamentos)
router.get("/", findAllPensamentos)
router.get("/top", topPensamento)
router.get("/search", searchByTitle)
router.get("/byUser" , authMiddleware, byUser)
router.get("/:id", authMiddleware, findById)
router.patch("/:id", authMiddleware, update)


export default router