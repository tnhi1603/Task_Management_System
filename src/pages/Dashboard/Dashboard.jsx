import { Grid, Box, Typography } from "@mui/material";
import TaskList from "./../../components/TaskList";
import TaskStats from "./../../components/TaskStats";
import FilterBar from "./../../components/FilterBar";
import AddTaskButton from "./../../components/AddTaskButton";
import React, { useState } from "react";

const Dashboard = ({ filteredTasks, setFilteredTasks }) => {
  const [tasks, setTasks] = useState(filteredTasks);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Trang chủ: Quản Lý Công Việc
      </Typography>

      <FilterBar tasks={tasks} setFilteredTasks={setFilteredTasks} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Cột trái: Danh sách công việc */}
        <Grid item xs={12} md={8}>
          <TaskList filteredTasks={filteredTasks} />
        </Grid>

        {/* Cột phải: Biểu đồ và thông tin */}
        <Grid item xs={12} md={4}>
          <TaskStats />
        </Grid>
      </Grid>

      <AddTaskButton />
    </Box>
  );
};

export default Dashboard;
