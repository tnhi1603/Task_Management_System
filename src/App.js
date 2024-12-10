import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Management from "./components/Management";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Notifications from "./components/Notifications";
//
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
//
const tasksBefore = [
  {
    id: 1,
    title: "Thi?t k? giao di?n Dashboard",
    description: "T?o mockup cho giao di?n qu?n l? công vi?c.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-10",
    relatedTasks: [2, 3],
    notes: "S? d?ng Figma ð? thi?t k?.",
  },
  {
    id: 2,
    title: "Phát tri?n API cho module công vi?c",
    description: "T?o các endpoint RESTful ð? thêm, s?a, xóa công vi?c.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-15",
    relatedTasks: [1],
    notes: "D?a trên mockup ðý?c thi?t k?.",
  },
  {
    id: 3,
    title: "Th?o lu?n yêu c?u v?i nhóm",
    description: "H?p nhóm ð? xác ð?nh yêu c?u chi ti?t c?a ph?n m?m.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-12-01",
    relatedTasks: [1],
    notes: "Hoàn thành tài li?u yêu c?u.",
  },
  {
    id: 4,
    title: "Tích h?p tính nãng t?m ki?m",
    description: "Thêm tính nãng t?m ki?m công vi?c theo tiêu chí.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-20",
    relatedTasks: [2],
    notes: "S? d?ng thý vi?n Fuse.js ð? h? tr? t?m ki?m.",
  },
  {
    id: 5,
    title: "Vi?t tài li?u hý?ng d?n s? d?ng",
    description:
      "T?o hý?ng d?n chi ti?t cho ngý?i dùng v? cách s? d?ng ?ng d?ng.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-25",
    relatedTasks: [],
    notes: "Kèm theo h?nh minh h?a.",
  },
  {
    id: 6,
    title: "Th?c hi?n ki?m th? unit",
    description: "Vi?t và ch?y các bài ki?m th? cho module công vi?c.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-12",
    relatedTasks: [2],
    notes: "S? d?ng Jest và React Testing Library.",
  },
  {
    id: 7,
    title: "Tri?n khai ?ng d?ng lên server",
    description: "C?u h?nh và tri?n khai ?ng d?ng lên AWS.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-30",
    relatedTasks: [4, 5],
    notes: "Ð?m b?o b?o m?t và t?i ýu hóa hi?u nãng.",
  },
  {
    id: 8,
    title: "T?i ýu hóa hi?u nãng ?ng d?ng",
    description: "Phân tích và c?i thi?n hi?u su?t t?i trang.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-28",
    relatedTasks: [7],
    notes: "S? d?ng Lighthouse ð? ki?m tra hi?u nãng.",
  },
  {
    id: 9,
    title: "Thi?t k? logo và favicon",
    description: "T?o logo và favicon cho ?ng d?ng.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-11-25",
    relatedTasks: [],
    notes: "Thi?t k? t?i gi?n, phù h?p v?i giao di?n.",
  },
  {
    id: 10,
    title: "T?o h? th?ng thông báo",
    description: "Thêm tính nãng thông báo khi công vi?c g?n h?t h?n.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-18",
    relatedTasks: [4],
    notes: "G?i thông báo qua email và SMS.",
  },
  {
    id: 11,
    title: "C?p nh?t UI cho trang công vi?c",
    description: "C?i ti?n giao di?n hi?n th? danh sách công vi?c.",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-12-15",
    relatedTasks: [1],
    notes: "Thêm ch?c nãng l?c và phân trang.",
  },
  {
    id: 12,
    title: "Phân quy?n ngý?i dùng",
    description: "Thêm tính nãng qu?n l? vai tr? và quy?n h?n.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-22",
    relatedTasks: [],
    notes: "Ch? admin m?i có quy?n xóa công vi?c.",
  },
  {
    id: 13,
    title: "Ðào t?o s? d?ng ph?n m?m",
    description: "T? ch?c bu?i ðào t?o cho khách hàng.",
    priority: "Low",
    status: "Not Started",
    dueDate: "2025-01-10",
    relatedTasks: [5],
    notes: "Chu?n b? tài li?u chi ti?t.",
  },
  {
    id: 14,
    title: "T?o báo cáo ti?n ð? d? án",
    description: "T? ð?ng t?o báo cáo theo th?i gian th?c.",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-12-19",
    relatedTasks: [],
    notes: "K?t h?p bi?u ð? Gantt.",
  },
  {
    id: 15,
    title: "Thêm tính nãng nh?p xu?t d? li?u",
    description:
      "Cho phép nh?p và xu?t danh sách công vi?c dý?i d?ng file Excel.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-17",
    relatedTasks: [],
    notes: "H? tr? ð?nh d?ng CSV và Excel.",
  },
  {
    id: 16,
    title: "C?p nh?t giao di?n ch? ð? t?i",
    description: "Thêm ch? ð? giao di?n sáng t?i.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-25",
    relatedTasks: [11],
    notes: "Dùng Material UI ð? h? tr? giao di?n.",
  },
  {
    id: 17,
    title: "B?o tr? h? th?ng ð?nh k?",
    description: "Ki?m tra và s?a l?i h? th?ng hàng tháng.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-11-20",
    relatedTasks: [],
    notes: "Lên l?ch b?o tr? vào cu?i tu?n.",
  },
  {
    id: 18,
    title: "Vi?t unit test cho module báo cáo",
    description: "Ð?m b?o ð? chính xác c?a báo cáo ti?n ð?.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-20",
    relatedTasks: [14],
    notes: "S? d?ng Mocha và Chai.",
  },
  {
    id: 19,
    title: "C?i thi?n hi?u nãng truy v?n MongoDB",
    description: "T?i ýu các câu truy v?n ð? tãng t?c ð?.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-21",
    relatedTasks: [2],
    notes: "Thêm index vào các trý?ng quan tr?ng.",
  },
  {
    id: 20,
    title: "T?o giao di?n qu?n l? ngý?i dùng",
    description: "Cho phép admin qu?n l? danh sách ngý?i dùng.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-27",
    relatedTasks: [12],
    notes: "Thêm ch?c nãng t?m ki?m và phân trang.",
  },
];
function App() {
  const [filteredTasks, setFilteredTasks] = useState(tasksBefore); // Danh sách ð? l?c
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/management" element={<Management />} />
        <Route path="/notifications" element={<Notifications />} />
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
          path="/TaskListPage"
          element={
            <TaskListPage
              filteredTasks={filteredTasks}
              tasksBefore={tasksBefore}
            />
          }
        />
        <Route
          path="/TaskDetailPage"
          element={
            <TaskDetailPage
            // filteredTasks={filteredTasks}
            // tasksBefore={tasksBefore}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
