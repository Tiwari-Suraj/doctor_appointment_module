# Admin Panel Overview  - Doctor Appointment System

This Admin Panel is a web-based management system built using the MERN stack with Redux for state management. It supports two types of user logins: **Admin** and **Doctor**, each with role-specific features and dashboards.

---

## 🔐 Login Roles

### 1. Admin Login
Admins have full access to the system. Features include:

- 📊 **Dashboard**: Overview of key metrics and statistics.
- 👨‍⚕️ **Doctors Management**:
  - View all registered doctors.
  - Add new doctor profiles.
- 🧑‍🤝‍🧑 **Patient List**: View all registered patients.
- 📅 **Appointments**: View all appointments scheduled in the system.

### 2. Doctor Login
Doctors have limited access focused on their own schedules and profiles. Features include:

- 🧑‍⚕️ **Profile**: View and manage personal profile details.
- 📅 **Appointments**: View appointments assigned to the logged-in doctor.
- 📊 **Dashboard**: View doctor-specific statistics and upcoming appointments.

---

## 🛠️ Technologies Used

- **MongoDB** – NoSQL database for storing users, appointments, doctors, and patient data.
- **Express.js** – Backend framework for building RESTful APIs.
- **React.js wite Vite** – Frontend library for building the user interface.
- **Node.js** – JavaScript runtime environment for the backend.
- **Redux** – State management library for predictable and centralized application state.

---

## 📝 Notes

- Role-based authentication is implemented to restrict access to admin and doctor-specific routes.
- Data is securely stored and retrieved through RESTful APIs.
- Redux is used to efficiently manage global application state across different user roles and components.

---
