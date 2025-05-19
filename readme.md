# 🏥 Doctor Appointment System

This project is a **full-stack healthcare appointment system** built with the **MERN stack + Redux** using **Vite** for frontend builds. It includes:

- 🌐 **Frontend (User Panel)** – For patients to book appointments, view doctor profiles, and manage their profile.
- 🛠️ **Admin Panel** – For admins and doctors to manage appointments, doctors, and patients.
- ⚙️ **Backend Server** – REST API using Node.js, Express, and MongoDB to manage users, authentication, doctors, and appointments.

---

## 🧑‍💻 Tech Stack

- **Frontend & Admin Panel**: React (with Vite) + Redux + Tailwind 
- **Backend**: Node.js + Express.js + MongoDB + Mongoose
- **Authentication**: JWT-based (role-based: admin, doctor, patient)

---

## 🔐 Features

### 🧍‍♂️ User (Patient)
- View doctor list and individual doctor details
- Book appointment via time slot
- Create account, login, view profile
- Cancel appointment

### 🧑‍⚕️ Doctor
- Login and view their appointments
- Access doctor dashboard and profile

### 🧑‍💼 Admin
- Login and manage:
  - All appointments
  - Doctor list (add/view)
  - Patient list
  - Dashboard analytics

---

For setting up the project, follow the instructions in the respective READMEs.

1. Clone the repository:

   ```bash
   git clone https://github.com/Tiwari-Suraj/docter-apoinment-web.git
   ```

2. Navigate to the project directory:

   ```bash
   cd doctor-appointment-web-master
   ```
3. Navigate to the frontend directory:

   ```bash
    cd frontend
    ```
    nstall dependencies:

    ``bash
    npm install
    ``
    make .env file via demo.env and update the values

    run the pproject:

    ```bash
    npm run dev
    ```
4.   navigate to the backend directory:

    ```bash
    cd backend
    ```
    install dependencies:

    ```bash
    npm install
    ```
    .env file via demo.env and update the values

    run the project:

    ```bash
    npm start
    ```
5. Navigate to the admin directory:

    ```bash
    cd admin
    ```
    install dependencies:

    ```bash
    npm install
    ```
    make .env file via demo.env and update the values

    run the project:
    
    ```bash
    npm start
    ```
---
