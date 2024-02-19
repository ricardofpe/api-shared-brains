import {Router} from 'express'
const router = Router()

import {createPensamentos, findAllPensamentos, findById, topPensamento} from '../controllers/pensamentos.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

router.post("/", authMiddleware, createPensamentos)
router.get("/", findAllPensamentos)
router.get("/top", topPensamento)
router.get("/:id", findById)

export default router