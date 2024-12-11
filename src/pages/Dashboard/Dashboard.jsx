import { Grid, Box, Typography } from "@mui/material";
import TaskList from "./../../components//TaskList";
import TaskStats from "./../../components/TaskStats";
import FilterBar from "./../../components/FilterBar";
import AddTaskButton from "./../../components/AddTaskButton";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// const tasksBefore = [
//   {
//     id: 1,
//     title: "Hoàn thành báo cáo",
//     dueDate: "2024-12-01",
//     priority: "High",
//   },
//   { id: 2, title: "Họp nhóm", dueDate: "2024-12-07", priority: "Medium" },
//   {
//     id: 3,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-02",
//     priority: "Low",
//   },
//   {
//     id: 4,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-03",
//     priority: "Medium",
//   },
//   {
//     id: 5,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-04",
//     priority: "Medium",
//   },
//   {
//     id: 6,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-05",
//     priority: "High",
//   },
//   {
//     id: 7,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-06",
//     priority: "Medium",
//   },
//   {
//     id: 8,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-07",
//     priority: "High",
//   },
//   {
//     id: 9,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-08",
//     priority: "Medium",
//   },
//   {
//     id: 9,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-10",
//     priority: "Low",
//   },
//   {
//     id: 10,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-11",
//     priority: "High",
//   },
//   {
//     id: 11,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-12",
//     priority: "Low",
//   },
//   {
//     id: 12,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-23",
//     priority: "Medium",
//   },
//   {
//     id: 13,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-25",
//     priority: "Low",
//   },
//   {
//     id: 14,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-29",
//     priority: "High",
//   },
//   {
//     id: 15,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-26",
//     priority: "Medium",
//   },
//   {
//     id: 16,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-20",
//     priority: "Low",
//   },
//   {
//     id: 17,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-27",
//     priority: "Low",
//   },
//   {
//     id: 18,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-28",
//     priority: "Low",
//   },
//   {
//     id: 19,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-30",
//     priority: "Medium",
//   },
//   {
//     id: 20,
//     title: "Thiết kế giao diện",
//     dueDate: "2024-12-31",
//     priority: "Low",
//   },
// ];
const Dashboard = ({ filteredTasks, setFilteredTasks }) => {
  const [tasks, setTasks] = useState(filteredTasks);
  // useEffect(() => {
  //   // Lấy danh sách công việc từ backend
  //   const fetchTasks = async () => {
  //     const response = await axios.get("/api/tasks");
  //     setTasks(response.data);
  //   };
  //   fetchTasks();
  // }, []);
  // const handleTaskAdded = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, newTask]);
  // };

  // const [filteredTasks, setFilteredTasks] = useState(tasksBefore); // Danh sách đã lọc

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
