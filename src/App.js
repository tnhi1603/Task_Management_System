import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Management from "./components/Projects";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Notifications from "./components/Notifications";
import AuthComponent from "./components/AuthComponent";
//
import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
//
const tasksBefore = [
  {
    id: 1,
    title: "Thi?t k? giao di?n Dashboard",
    description: "T?o mockup cho giao di?n qu?n l? c�ng vi?c.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-10",
    relatedTasks: [2, 3],
    notes: "S? d?ng Figma �? thi?t k?.",
  },
  {
    id: 2,
    title: "Ph�t tri?n API cho module c�ng vi?c",
    description: "T?o c�c endpoint RESTful �? th�m, s?a, x�a c�ng vi?c.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-15",
    relatedTasks: [1],
    notes: "D?a tr�n mockup ��?c thi?t k?.",
  },
  {
    id: 3,
    title: "Th?o lu?n y�u c?u v?i nh�m",
    description: "H?p nh�m �? x�c �?nh y�u c?u chi ti?t c?a ph?n m?m.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-12-01",
    relatedTasks: [1],
    notes: "Ho�n th�nh t�i li?u y�u c?u.",
  },
  {
    id: 4,
    title: "T�ch h?p t�nh n�ng t?m ki?m",
    description: "Th�m t�nh n�ng t?m ki?m c�ng vi?c theo ti�u ch�.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-20",
    relatedTasks: [2],
    notes: "S? d?ng th� vi?n Fuse.js �? h? tr? t?m ki?m.",
  },
  {
    id: 5,
    title: "Vi?t t�i li?u h�?ng d?n s? d?ng",
    description:
      "T?o h�?ng d?n chi ti?t cho ng�?i d�ng v? c�ch s? d?ng ?ng d?ng.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-25",
    relatedTasks: [],
    notes: "K�m theo h?nh minh h?a.",
  },
  {
    id: 6,
    title: "Th?c hi?n ki?m th? unit",
    description: "Vi?t v� ch?y c�c b�i ki?m th? cho module c�ng vi?c.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-12",
    relatedTasks: [2],
    notes: "S? d?ng Jest v� React Testing Library.",
  },
  {
    id: 7,
    title: "Tri?n khai ?ng d?ng l�n server",
    description: "C?u h?nh v� tri?n khai ?ng d?ng l�n AWS.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-30",
    relatedTasks: [4, 5],
    notes: "�?m b?o b?o m?t v� t?i �u h�a hi?u n�ng.",
  },
  {
    id: 8,
    title: "T?i �u h�a hi?u n�ng ?ng d?ng",
    description: "Ph�n t�ch v� c?i thi?n hi?u su?t t?i trang.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-28",
    relatedTasks: [7],
    notes: "S? d?ng Lighthouse �? ki?m tra hi?u n�ng.",
  },
  {
    id: 9,
    title: "Thi?t k? logo v� favicon",
    description: "T?o logo v� favicon cho ?ng d?ng.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-11-25",
    relatedTasks: [],
    notes: "Thi?t k? t?i gi?n, ph� h?p v?i giao di?n.",
  },
  {
    id: 10,
    title: "T?o h? th?ng th�ng b�o",
    description: "Th�m t�nh n�ng th�ng b�o khi c�ng vi?c g?n h?t h?n.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-18",
    relatedTasks: [4],
    notes: "G?i th�ng b�o qua email v� SMS.",
  },
  {
    id: 11,
    title: "C?p nh?t UI cho trang c�ng vi?c",
    description: "C?i ti?n giao di?n hi?n th? danh s�ch c�ng vi?c.",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-12-15",
    relatedTasks: [1],
    notes: "Th�m ch?c n�ng l?c v� ph�n trang.",
  },
  {
    id: 12,
    title: "Ph�n quy?n ng�?i d�ng",
    description: "Th�m t�nh n�ng qu?n l? vai tr? v� quy?n h?n.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-22",
    relatedTasks: [],
    notes: "Ch? admin m?i c� quy?n x�a c�ng vi?c.",
  },
  {
    id: 13,
    title: "��o t?o s? d?ng ph?n m?m",
    description: "T? ch?c bu?i ��o t?o cho kh�ch h�ng.",
    priority: "Low",
    status: "Not Started",
    dueDate: "2025-01-10",
    relatedTasks: [5],
    notes: "Chu?n b? t�i li?u chi ti?t.",
  },
  {
    id: 14,
    title: "T?o b�o c�o ti?n �? d? �n",
    description: "T? �?ng t?o b�o c�o theo th?i gian th?c.",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-12-19",
    relatedTasks: [],
    notes: "K?t h?p bi?u �? Gantt.",
  },
  {
    id: 15,
    title: "Th�m t�nh n�ng nh?p xu?t d? li?u",
    description:
      "Cho ph�p nh?p v� xu?t danh s�ch c�ng vi?c d�?i d?ng file Excel.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-17",
    relatedTasks: [],
    notes: "H? tr? �?nh d?ng CSV v� Excel.",
  },
  {
    id: 16,
    title: "C?p nh?t giao di?n ch? �? t?i",
    description: "Th�m ch? �? giao di?n s�ng t?i.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-25",
    relatedTasks: [11],
    notes: "D�ng Material UI �? h? tr? giao di?n.",
  },
  {
    id: 17,
    title: "B?o tr? h? th?ng �?nh k?",
    description: "Ki?m tra v� s?a l?i h? th?ng h�ng th�ng.",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-11-20",
    relatedTasks: [],
    notes: "L�n l?ch b?o tr? v�o cu?i tu?n.",
  },
  {
    id: 18,
    title: "Vi?t unit test cho module b�o c�o",
    description: "�?m b?o �? ch�nh x�c c?a b�o c�o ti?n �?.",
    priority: "High",
    status: "Not Started",
    dueDate: "2024-12-20",
    relatedTasks: [14],
    notes: "S? d?ng Mocha v� Chai.",
  },
  {
    id: 19,
    title: "C?i thi?n hi?u n�ng truy v?n MongoDB",
    description: "T?i �u c�c c�u truy v?n �? t�ng t?c �?.",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-21",
    relatedTasks: [2],
    notes: "Th�m index v�o c�c tr�?ng quan tr?ng.",
  },
  {
    id: 20,
    title: "T?o giao di?n qu?n l? ng�?i d�ng",
    description: "Cho ph�p admin qu?n l? danh s�ch ng�?i d�ng.",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2024-12-27",
    relatedTasks: [12],
    notes: "Th�m ch?c n�ng t?m ki?m v� ph�n trang.",
  },
];
function App() {
  const [filteredTasks, setFilteredTasks] = useState(tasksBefore); // Danh s�ch �? l?c
  return (
    <Router>
      {/* <Navbar /> */}

      <Routes>
        {/* Muốn bật Login và Register thì đóng Navbar và các Route khác rồi hãy bật lên lại */}
        {/* <Route path="/" element={<AuthComponent />}/>   */}

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
              filteredTasks={filteredTasks}
              tasksBefore={tasksBefore}
            />
          }
        />
        <Route
          path="/task-details"
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
