import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const TaskItem = ({ task, setTasks }) => {
  const handleMarkComplete = async () => {
    await axios.patch(`http://localhost:5001/tasks/${task.id}`, {
      status: "completed",
    });
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: "completed" } : t))
    );
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5001/tasks/${task.id}`);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const navigate = useNavigate(); // Hook điều hướng
  const handleEdit = () => {
    navigate("/TaskDetailPage", { state: { task: task } });
  };

  return (
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button
          onClick={handleMarkComplete}
          disabled={task.status === "completed"}
        >
          Đánh dấu hoàn thành
        </Button>
        <Button onClick={handleEdit}>Sửa</Button>
        <Button onClick={handleDelete} color="error">
          Xóa
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
