import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Management from "./components/Projects";
import Notifications from "./components/Notifications";
import AuthComponent from "./components/AuthComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
        const response = await fetch("http://localhost:5001/api/task");
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
                <Management />
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
            path="/task-details/:id"
            element={
              <ProtectedRoute>
                <TaskDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
