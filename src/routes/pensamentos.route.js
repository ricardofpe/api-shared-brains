import {Router} from 'express'
const router = Router()

import {createPensamentos, findAllPensamentos} from '../controllers/pensamentos.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

router.post("/", authMiddleware, createPensamentos)
router.get("/", findAllPensamentos)



export default router