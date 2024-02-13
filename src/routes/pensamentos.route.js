import {Router} from 'express'
const router = Router()

import {createPensamentos, findAllPensamentos} from '../controllers/pensamentos.controller.js'

router.post("/", createPensamentos)
router.get("/", findAllPensamentos)



export default router