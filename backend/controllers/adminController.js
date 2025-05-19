import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import appointmentModel from '../models/appointmentModel.js';

// Api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        const missingFields = [];

        if (!name) missingFields.push("name");
        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");
        if (!speciality) missingFields.push("speciality");
        if (!degree) missingFields.push("degree");
        if (!experience) missingFields.push("experience");
        if (!about) missingFields.push("about");
        if (!fees) missingFields.push("fees");
        if (!address) missingFields.push("address");

        if (missingFields.length > 0) {
            return res.json({ success: false, message: `Missing Details: ${missingFields.join(", ")}` });
        }

        // // Check if image is present
        if (!imageFile || !imageFile.path) {
            return res.json({ success: false, message: "Image file is required" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Construct doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Api for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


// API to get apoointment list

const apoointmentsAdmin = async (req, res) => {

    try {
        const appointment = await appointmentModel.find({})
        res.json({ success: true, appointment })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }


}

//  API  to get dashbord data for admin panel


const adminDashbord = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointment.length,
            patients: users.length,
            latestAppointments: appointment.reverse().slice(0, 5)

        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addDoctor, loginAdmin, allDoctors, apoointmentsAdmin, adminDashbord };
