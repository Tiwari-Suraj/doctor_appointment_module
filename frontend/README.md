# Frontend  - Doctor Appointment System

This is the **frontend** of a healthcare appointment booking system built using the **MERN** stack with **Redux** for state management. The frontend provides a seamless and interactive experience for users to explore doctors, book appointments, and manage their profiles.

---

## 🌐 Key Features for Users

### 🧑‍⚕️ Doctors Directory
- View a **list of all available doctors**.
- Click to see **individual doctor profiles**, including specialization, available slots, and details.

### 📅 Appointment Booking
- Book appointments by selecting an **available slot** from a doctor’s profile.
- Get confirmation upon successful booking.

### 🧑‍💼 User Authentication
- **Register** a new account as a patient.
- **Login** securely to access personal features.

### 🙍‍♂️ User Dashboard
- View personal **profile data** including name, contact info, and history.
- See a list of **booked appointments**.
- **Cancel appointments** if needed.

---

## 🛠️ Technology Stack

- **MongoDB** – Stores user data, doctor profiles, appointment details.
- **Express.js** – Backend API for handling data operations (connected to this frontend).
- **React.js with Vite** – Provides a responsive and dynamic user interface.
- **Node.js** – Backend runtime environment.
- **Redux** – Used for centralized and predictable state management across components.

---

## ⚙️ How It Works

1. On visiting the homepage, users can:
   - Browse doctors
   - Register or login to book appointments

2. Once logged in:
   - Users can access their personal dashboard
   - Book or cancel appointments
   - View and update their profile if needed

3. All data is fetched through API calls from the backend and managed via Redux.

---

## 📝 Notes

- Ensure that the backend server is running to handle API requests.
- Redux is used to manage authentication state, doctor data, and appointments.
- The UI is responsive and designed to work on both desktop and mobile devices.

---

