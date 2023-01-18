import express from 'express'
import { getEmployer, getEmployees, updateEmployer, deleteEmployer} from '../controllers/employees.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', verifyToken, getEmployees)
router.get('/:id', verifyToken, getEmployer)
router.put('/:id', verifyToken, updateEmployer)
router.delete('/:id', verifyToken, deleteEmployer)

export default router
