import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourse, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import upload from '../configs/multer.js'

const educatorRouter = express.Router()

// Add Educator role
educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator,addCourse)
educatorRouter.get ('/courses', protectEducator, getEducatorCourse)
educatorRouter.get ('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get ('/enrolled-students', protectEducator, getEnrolledStudentsData)

export default educatorRouter;

