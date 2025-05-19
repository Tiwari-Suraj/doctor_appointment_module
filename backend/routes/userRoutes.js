import express from 'express'

import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js'
import authUsers from '../middleware/authUsers.js'
import upload from '../middleware/muler.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUsers, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUsers, updateProfile)
userRouter.post('/book-appointment', authUsers, bookAppointment)
userRouter.get('/appointments', authUsers, listAppointment)
userRouter.post('/cancel-appointment', authUsers, cancelAppointment)




export default userRouter