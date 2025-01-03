import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import FilterBar from "../../components/FilterBar";
import TaskList from "../../components/TaskList";
import TaskStats from "../../components/TaskStats";
import AddTaskButton from "../../components/AddTaskButton";
import axios from "axios";

const Dashboard = ({ filteredTasks, setFilteredTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [taskStatistics, setTaskStatistics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    notStartedTasks: 0,
    progress: 0,
  });

  useEffect(() => {
    const fetchTasksAndStatistics = async () => {
      try {
        const token = localStorage.getItem("token");
        const tasksResponse = await axios.get(
          "http://localhost:5001/api/task",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(tasksResponse.data);

        const statsResponse = await axios.get(
          "http://localhost:5001/api/task/statistics",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTaskStatistics(statsResponse.data);
      } catch (error) {
        console.error("Error fetching tasks and statistics:", error);
      }
    };

    fetchTasksAndStatistics();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks, setFilteredTasks]);

  const handleFilter = (filter) => {
    let filtered = [...tasks];

    if (filter.status) {
      filtered = filtered.filter((task) => task.status === filter.status);
    }

    if (filter.startDate) {
      filtered = filtered.filter(
        (task) => new Date(task.startDate) >= new Date(filter.startDate)
      );
    }

    if (filter.endDate) {
      filtered = filtered.filter(
        (task) => new Date(task.dueDate) <= new Date(filter.endDate)
      );
    }

    if (filter.keyword) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
          task.description?.toLowerCase().includes(filter.keyword.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard: Task Management
      </Typography>

      {/* FilterBar */}
      <FilterBar onFilter={handleFilter} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left column: Task list */}
        <Grid item xs={12} md={8}>
          {filteredTasks.length > 0 ? (
            <TaskList filteredTasks={filteredTasks} />
          ) : (
            <Typography>No tasks to display.</Typography>
          )}
        </Grid>

        {/* Right column: Charts and information */}
        <Grid item xs={12} md={4}>
          <TaskStats taskStatistics={taskStatistics} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
