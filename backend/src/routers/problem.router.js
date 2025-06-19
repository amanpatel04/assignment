import { Router } from "express"
import { 
  syncProblemonByHandle,
  getProblemsByHandle
} from "../controllers/problem.controllers.js"

export const router = Router()

router.route('/sync').get(syncProblemonByHandle)
router.route('/list').get(getProblemsByHandle)