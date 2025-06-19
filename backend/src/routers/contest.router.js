import { Router } from "express"

export const router = Router()

import { 
  getContestByHandle,
  syncContestByHandle
} from "../controllers/contest.controllers.js"

router.route('/list').get(getContestByHandle)
router.route('/sync').get(syncContestByHandle)