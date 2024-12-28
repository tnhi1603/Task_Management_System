import { Grid, Box, Typography } from "@mui/material";
import TaskList from "./../../components/TaskList";
import TaskStats from "./../../components/TaskStats";
import FilterBar from "./../../components/FilterBar";
import AddTaskButton from "./../../components/AddTaskButton";
import React, { useState } from "react";
import TaskListPage from "./../TaskListPage/TaskListPage"; // Import the TaskListPage

const Dashboard = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState([]); // Store the tasks fetched from API

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Trang chủ: Quản Lý Công Việc
      </Typography>

      {/* Render the TaskListPage which will handle filtering and sorting */}
      <TaskListPage 
        tasks={tasks} 
        setTasks={setTasks} 
        setFilteredTasks={setFilteredTasks} 
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left column: Task List */}
        <Grid item xs={12} md={8}>
          <TaskList filteredTasks={filteredTasks} />
        </Grid>

        {/* Right column: Task Stats */}
        <Grid item xs={12} md={4}>
          <TaskStats />
        </Grid>
      </Grid>

      <AddTaskButton />
    </Box>
  );
};

export default Dashboard;
