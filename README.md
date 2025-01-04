# Task Management System

## Course Details

- **Course**: SE347.P12 - Công nghệ Web và ứng dụng
- **Instructor**: Nguyễn Tấn Toàn
- **Institution**: University of Information Technology (UIT), Ho Chi Minh City

## Overview

The Task Management System is a React-based application designed to help users manage tasks and projects efficiently. It provides features such as task creation, project management, notifications, and user profiles. The app utilizes Material-UI for its design and includes various interactive components for a seamless user experience.

## Group Members

- **19522283**: Nguyễn Ngọc Thịnh
- **21522679**: Trần Trung Tín
- **21521236**: Trần Thảo Nhi
- **20521353**: Nguyễn Văn Hoành
- **20521875**: Nguyễn Duy Tân

## Features

1. **Task Management**

   - Create, update, delete, and view tasks.
   - Assign priorities and statuses to tasks.
   - Filter tasks by status, priority, and keywords.

2. **Project Management**

   - Add and manage projects.
   - Assign members to projects.
   - Track project progress with statistics and member details.

3. **User Authentication**

   - Register and log in using email and password.
   - Authentication is handled via JWT tokens stored in local storage.

4. **Notifications**

   - View and manage notifications related to tasks and projects.
   - Create custom notifications.

5. **User Profile**

   - Edit user details such as name, email, phone, and avatar.
   - Change passwords.

6. **Dashboard**
   - View task statistics.
   - Filter and view tasks in a centralized interface.

## Project Structure

```
src/
├── components/
│   ├── AuthComponent.js
│   ├── Navbar.js
│   ├── Notifications.js
│   ├── TaskItem.jsx
│   ├── FilterBar.jsx
│   └── TaskStats.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── TaskListPage.jsx
│   ├── TaskDetailPage.jsx
│   ├── ProjectPage.jsx
│   └── ProjectDetailPage.jsx
├── App.js
├── index.js
├── contexts/
│   └── UserContext.js
├── utils/
└── styles/
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd task-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Key Components

### AuthComponent.js

Handles user authentication, including login and registration.

### Navbar.js

Displays the navigation bar with links to key pages such as Dashboard, Tasks, Projects, and Profile.

### TaskItem.jsx

Defines a single task row with actions like editing, marking complete, and deleting tasks.

### FilterBar.jsx

Provides filtering options for tasks based on status, date range, and keywords.

### TaskStats.jsx

Visualizes task statistics using a pie chart.

### Notifications.js

Manages and displays notifications.

### Dashboard.jsx

Serves as the main interface for viewing tasks and task statistics.

### TaskListPage.jsx

Lists tasks with options for sorting, filtering, and managing statuses.

### ProjectPage.jsx

Manages projects and their associated members and tasks.

### ProjectDetailPage.jsx

Displays details about a specific project, including its tasks and members.

## API Endpoints

The application interacts with a backend server running on `http://localhost:5001`. Key endpoints include:

### Authentication

- `POST /api/auth/login`: Login a user.
- `POST /api/auth/register`: Register a new user.

### Tasks

- `GET /api/task`: Retrieve all tasks.
- `GET /api/task/:id`: Retrieve details of a specific task.
- `POST /api/task`: Create a new task.
- `PATCH /api/task/:id`: Update a task.
- `DELETE /api/task/:id`: Delete a task.

### Projects

- `GET /api/project`: Retrieve all projects.
- `GET /api/project/:id`: Retrieve details of a specific project.
- `POST /api/project`: Create a new project.
- `PATCH /api/project/:id`: Update a project.
- `DELETE /api/project/:id`: Delete a project.

### Notifications

- `GET /api/notification`: Retrieve all notifications.
- `POST /api/notification`: Create a new notification.
- `PATCH /api/notification/:id`: Update a notification.
- `DELETE /api/notification/:id`: Delete a notification.

## Development Tools

- **React Router**: For routing between different pages.
- **Material-UI**: For UI components and styling.
- **Axios**: For API calls.
- **Recharts**: For visualizing task statistics.

## Contributions

Feel free to fork the repository and submit pull requests. Contributions are welcome.

## License

This project is licensed under the MIT License.
