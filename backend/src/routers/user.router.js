import { Router } from "express"
import multer from "multer"
import { 
  test,
  getAllUsers, 
  isValidHandle,
  addUserByHandle,
  getUserById,
  updateUserById,
  deleteUserById
} from "../controllers/user.controllers.js"

export const router = Router()
const upload = multer();

router.route('/').get(test)
router.route('/all').get(getAllUsers)
router.route('/handle').get(isValidHandle)
router.route('/add').get(addUserByHandle)
router.route('/update/:id').put(upload.none(), updateUserById)
router.route('/delete/:id').delete(deleteUserById)
router.route('/:id').get(getUserById)

