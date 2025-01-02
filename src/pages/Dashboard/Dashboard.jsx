import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import TaskList from "../../components/TaskList";
import TaskStats from "../../components/TaskStats";
import FilterBar from "../../components/FilterBar";
import AddTaskButton from "../../components/AddTaskButton";

const Dashboard = ({ filteredTasks, setFilteredTasks }) => {
  const [tasks, setTasks] = useState([]); // Initialize with an empty array

  // Đồng bộ hóa filteredTasks khi tasks thay đổi
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks, setFilteredTasks]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Trang chủ: Quản Lý Công Việc
      </Typography>

      {/* FilterBar */}
      <FilterBar tasks={tasks} setFilteredTasks={setFilteredTasks} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Cột trái: Danh sách công việc */}
        <Grid item xs={12} md={8}>
          {filteredTasks.length > 0 ? (
            <TaskList filteredTasks={filteredTasks} />
          ) : (
            <Typography>Không có công việc nào để hiển thị.</Typography>
          )}
        </Grid>

        {/* Cột phải: Biểu đồ và thông tin */}
        <Grid item xs={12} md={4}>
          <TaskStats tasks={tasks} />
        </Grid>
      </Grid>

      <AddTaskButton
        onTaskAdded={(newTask) =>
          setTasks((prevTasks) => [...prevTasks, newTask])
        }
      />
    </Box>
  );
};

export default Dashboard;
