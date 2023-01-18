import express from 'express'
import { getDepartment, getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../controllers/departments.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getDepartments)
router.get('/:id', verifyToken, getDepartment)
router.post('/', verifyToken, addDepartment)
router.put('/:id', verifyToken, updateDepartment)
router.delete('/:id', verifyToken, deleteDepartment)

export default router
