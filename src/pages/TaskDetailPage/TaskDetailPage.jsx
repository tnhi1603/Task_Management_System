import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetailPage = () => {
  const { taskId } = useParams(); // Extract taskId from URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/task/${taskId}`
        );
        const taskData = response.data;
        console.log(taskData);
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setPriority(taskData.priority);
        setStatus(taskData.status);
        setDueDate(new Date(taskData.dueDate).toISOString().slice(0, 16)); // Chuyển đổi định dạng datetime-local
        setStartDate(new Date(taskData.startDate).toISOString().slice(0, 16));
        setUpdatedAt(
          taskData.updateTime
            ? formatDateTime(new Date(taskData.updateTime))
            : formatDateTime(new Date())
        );

        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;

          // Kiểm tra nếu user hiện tại là owner của project
          if (taskData.project_owner._id === userId) {
            setIsOwner(true);
          }
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const formatDateTime = (date) => {
    return date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTask = {
        title,
        description,
        priority,
        status,
        dueDate,
        startDate,
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Nếu API yêu cầu authentication
        },
      };
      await axios.put(
        `http://localhost:5001/api/task/${task._id}`,
        updatedTask,
        config
      );
      setOpenEditDialog(false);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Nếu API yêu cầu authentication
        },
      };
      await axios.delete(`http://localhost:5001/api/task/${task._id}`, config);
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) return <Typography>Đang tải thông tin công việc...</Typography>;

  return (
    <Box padding={4}>
      <Card elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h4" marginBottom={2}>
            {task.title}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Mô tả:</strong> {task.description || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Mức độ ưu tiên:</strong> {task.priority || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Trạng thái:</strong> {task.status || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Thời hạn:</strong>{" "}
            {task.dueDate ? formatDateTime(new Date(task.dueDate)) : "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Ngày bắt đầu:</strong>{" "}
            {task.startDate
              ? formatDateTime(new Date(task.startDate))
              : "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Ngày cập nhật:</strong> {updatedAt || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Dự án:</strong> {task.project_details.name || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Người tạo dự án:</strong>{" "}
            {task.project_owner.name || "Không có"}
          </Typography>
          <Typography variant="body1" marginBottom={1}>
            <strong>Thành viên được phân công:</strong>{" "}
            {task.assigned_users?.name || "Không có"}
          </Typography>
        </CardContent>
        <CardActions>
          {isOwner && (
            <>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Chỉnh sửa công việc
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Xóa công việc
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
      >
        <DialogTitle>Chỉnh sửa công việc</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mức độ ưu tiên"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Low">Thấp</MenuItem>
            <MenuItem value="Medium">Trung bình</MenuItem>
            <MenuItem value="High">Cao</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Trạng thái"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Not Started">Chưa bắt đầu</MenuItem>
            <MenuItem value="In Progress">Đang thực hiện</MenuItem>
            <MenuItem value="Completed">Hoàn thành</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Thời hạn"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Ngày bắt đầu"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetailPage;
