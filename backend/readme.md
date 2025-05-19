# Server - Doctor Appointment System

This is the **backend server** for the healthcare appointment system, built with the **MERN** stack. It handles business logic, database operations, and API routes for both the **Frontend (User Panel)** and the **Admin Panel**.

---

## 🌐 Responsibilities of the Server

### 🔐 Authentication & Authorization
- **User Registration & Login** (Patients)
- **Doctor Login**
- **Admin Login**
- Secure JWT-based authentication
- Role-based access control (User, Doctor, Admin)

### 🧑‍⚕️ Doctor Management (Admin Panel)
- Add new doctors
- View all doctors
- Update or remove doctors
- View doctor-specific appointments

### 🧑‍💼 User Management (Frontend Panel)
- Register and login users (patients)
- View and update user profile
- View user appointments
- Cancel appointments

### 📅 Appointment Handling
- Book appointment slots with doctors
- Prevent double-booking of time slots
- Fetch and filter appointments by user, doctor, or admin

### 📊 Dashboard APIs
- Custom dashboards for:
  - Admin: Total doctors, appointments, and patients
  - Doctor: Own appointments and availability
  - User: Own booking history

---

## 🛠️ Technology Stack

- **MongoDB** – NoSQL database for storing users, doctors, and appointments
- **Express.js** – Web framework for building RESTful APIs
- **Node.js** – Backend runtime environment
- **JWT** – Authentication mechanism using JSON Web Tokens
- **Mongoose** – MongoDB ODM for data modeling and schema validation

---
