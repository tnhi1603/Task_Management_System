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
import Home from "./pages/Home";
import { Container, Box } from "@mui/material";
import Notifications from "./components/Notifications";
import AuthComponent from "./components/AuthComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";

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
  const [tasks, setTasks] = useState([]); // Assuming you will fetch tasks

  // Fetch tasks data when the app starts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/task");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setTasks(data); // Set tasks after fetching
        setFilteredTasks(data); // Set filtered tasks initially to all tasks
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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/projects" element={<Management />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/"
            element={
              <Dashboard
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <TaskListPage
                tasks={tasks}
                setTasks={setTasks}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
              />
            }
          />
          <Route path="/task-details/:taskId" element={<TaskDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
