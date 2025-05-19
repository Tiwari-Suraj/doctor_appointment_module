
import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor, doctorDashboard, doctorProfile, updateDoctorProfile } from "../controllers/doctorControllers.js";
import authDoctor from '../middleware/authDoctor.js';


const doctorRouter = express.Router()
doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile )
doctorRouter.get('/update-profile', authDoctor, updateDoctorProfile)




export default doctorRouter