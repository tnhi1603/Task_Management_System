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
  Snackbar,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetailPage = () => {
  const { taskId } = useParams();
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
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/task/${taskId}`
        );
        const taskData = response.data;
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setPriority(taskData.priority);
        setStatus(taskData.status);
        setDueDate(new Date(taskData.dueDate).toISOString().slice(0, 16));
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
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5001/api/task/${task._id}`,
        updatedTask,
        config
      );
      setTask(response.data);
      setOpenEditDialog(false);
      setSnackbar({
        open: true,
        message: "Công việc đã được cập nhật.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      setSnackbar({
        open: true,
        message: "Cập nhật công việc thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:5001/api/task/${task._id}`, config);
      navigate("/tasks");
      setSnackbar({
        open: true,
        message: "Công việc đã được xóa.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackbar({
        open: true,
        message: "Xóa công việc thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleMarkComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5001/api/task/${taskId}/status`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(response.data);
      setSnackbar({
        open: true,
        message: "Công việc đã được đánh dấu hoàn thành.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error marking task as completed:", error);
      setSnackbar({
        open: true,
        message: "Không thể đánh dấu hoàn thành. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleEditStatus = () => {
    setOpenStatusDialog(true);
  };

  const handleSaveStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5001/api/task/${taskId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(response.data);
      setOpenStatusDialog(false);
      setSnackbar({
        open: true,
        message: "Trạng thái công việc đã được cập nhật.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      setSnackbar({
        open: true,
        message: "Cập nhật trạng thái thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  if (!task) return <Typography>Đang tải thông tin công việc...</Typography>;

  return (
    <Box padding={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom color="primary">
              {task.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Mô tả:</strong> {task.description || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Mức độ ưu tiên:</strong> {task.priority || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Trạng thái:</strong> {task.status || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Thời hạn:</strong>{" "}
              {task.dueDate
                ? formatDateTime(new Date(task.dueDate))
                : "Không có"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Ngày bắt đầu:</strong>{" "}
              {task.startDate
                ? formatDateTime(new Date(task.startDate))
                : "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Ngày cập nhật:</strong> {updatedAt || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Dự án:</strong> {task.project_details?.name || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Người tạo dự án:</strong>{" "}
              {task.project_owner?.name || "Không có"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Thành viên được phân công:</strong>{" "}
              {task.assigned_users?.name || "Không có"}
            </Typography>
          </Grid>
          {isOwner && (
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{ textTransform: "none" }}
                >
                  Chỉnh sửa công việc
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{ textTransform: "none" }}
                >
                  Xóa công việc
                </Button>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleMarkComplete}
                sx={{ textTransform: "none" }}
              >
                Đánh dấu hoàn thành
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditStatus}
                sx={{ textTransform: "none" }}
              >
                Sửa trạng thái
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Chỉnh sửa công việc</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mức độ ưu tiên"
                select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="Low">Thấp</MenuItem>
                <MenuItem value="Medium">Trung bình</MenuItem>
                <MenuItem value="High">Cao</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Trạng thái"
                select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="Not Started">Chưa bắt đầu</MenuItem>
                <MenuItem value="In Progress">Đang tiến hành</MenuItem>
                <MenuItem value="Completed">Hoàn thành</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Thời hạn"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày bắt đầu"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Sửa Trạng Thái Công Việc</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Trạng Thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="Not Started">Chưa bắt đầu</MenuItem>
            <MenuItem value="In Progress">Đang tiến hành</MenuItem>
            <MenuItem value="Completed">Hoàn thành</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)} color="secondary">
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveStatus}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskDetailPage;
