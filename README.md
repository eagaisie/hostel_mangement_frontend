# Hostel Management System

## Overview

The Hostel Management System is a web application designed to streamline hostel room management and student housing applications. It provides a platform for administrators to manage rooms, handle student applications, and for students to apply for hostel accommodation.

## Features

- **User Authentication**: Secure login and registration for students and administrators
- **Room Management**: Create, view, edit, and delete hostel rooms
- **Application System**: Students can apply for rooms and administrators can approve/reject applications
- **Admin Dashboard**: Comprehensive dashboard for managing rooms and applications
- **Responsive Design**: Mobile-friendly interface for all users

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with responsive design
- **HTTP Client**: Fetch API

## Project Structure

### Frontend

- **Pages**:
  - `index.html`: Login and registration page
  - `admin-dashboard.html`: Admin overview
  - `admin-applications.html`: Housing applications management
  - `admin-rooms.html`: Room management
  - `admin-create-room.html`: Room creation form
  - `student-dashboard.html`: Student overview
  - `application.html`: Student housing application form

- **JavaScript**:
  - `auth.js`: Authentication and user management
  - `admin-dashboard.js`: Admin dashboard functionality
  - `admin-applications.js`: Application management
  - `admin-rooms.js`: Room management
  - `admin-create-room.js`: Room creation
  - `student-dashboard.js`: Student dashboard functionality
  - `application.js`: Application form handling

- **CSS**:
  - `styles.css`: Global styles
  - `dashboard.css`: Dashboard-specific styles
  - `admin.css`: Admin-specific styles

### Backend

- **API Endpoints**:
  - `/auth`: Authentication routes (login, register, logout)
  - `/rooms`: Room management routes
  - `/applications`: Housing application routes

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/hostel-management.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd hostel-management
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```

5. **Run the application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   - Open your browser and go to `http://localhost:3000`

## Usage

### For Students
1. Register/Login to your account
2. View available rooms
3. Submit housing applications
4. Track application status

### For Administrators
1. Login to admin dashboard
2. Manage rooms (create, edit, delete)
3. Review and process housing applications
4. Assign rooms to approved applications

## Admin Access

- **Email**: arnold@gmail.com
- **Password**: test

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact
