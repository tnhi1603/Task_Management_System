import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Notifications from "./components/Notifications";
import AuthComponent from "./components/AuthComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Đảm bảo thuộc tính main được định nghĩa
    },
    secondary: {
      main: "#dc004e",
    },
    // Các màu khác nếu cần
  },
});

function Layout({ children }) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      {children}
    </>
  );
}

function App() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(
          `http://localhost:5001/api/task/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<AuthComponent />} />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskListPage
                    tasks={tasks}
                    setTasks={setTasks}
                    filteredTasks={filteredTasks}
                    setFilteredTasks={setFilteredTasks}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task-details/:taskId"
              element={
                <ProtectedRoute>
                  <TaskDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
