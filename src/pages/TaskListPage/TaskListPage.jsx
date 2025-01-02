import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Typography,
  Chip,
  Grid,
  Paper,
  Toolbar,
  IconButton,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  borderLeft: `5px solid`,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
    cursor: "pointer",
  },
}));

const TaskListPage = ({
  tasks,
  setTasks,
  setFilteredTasks,
  filteredTasks = [],
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    project: "",
    priority: "",
    sortBy: "dueDate",
    search: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [projects, setProjects] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
  });

  // State cho Dialog Sửa Trạng Thái
  const [editStatusDialog, setEditStatusDialog] = useState({
    open: false,
    taskId: null,
    currentStatus: "",
  });
  const [selectedStatus, setSelectedStatus] = useState("");

  // Hàm mở Dialog Sửa Trạng Thái
  const openEditStatusDialog = (taskId, currentStatus) => {
    setEditStatusDialog({ open: true, taskId, currentStatus });
    setSelectedStatus(currentStatus);
  };

  // Hàm đóng Dialog Sửa Trạng Thái
  const closeEditStatusDialog = () => {
    setEditStatusDialog({ open: false, taskId: null, currentStatus: "" });
  };

  // Hàm cập nhật trạng thái task
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5001/api/task/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Cập nhật trạng thái trong state
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: updatedTask.status } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: updatedTask.status } : task
        )
      );
      setLoading(false);

      // Hiển thị thông báo thành công
      setSnackbar({
        open: true,
        message: "Cập nhật trạng thái thành công!",
        severity: "success",
      });
    } catch (err) {
      console.error("Error updating task status:", err);
      setSnackbar({
        open: true,
        message: "Cập nhật trạng thái thất bại!",
        severity: "error",
      });
      setLoading(false);
    }
  };

  // Hàm đánh dấu hoàn thành
  const handleMarkComplete = async (taskId) => {
    await updateTaskStatus(taskId, "Completed");
  };

  // Hàm lưu trạng thái mới từ Dialog
  const handleSaveEditStatus = async () => {
    const { taskId } = editStatusDialog;
    if (taskId && selectedStatus) {
      await updateTaskStatus(taskId, selectedStatus);
      closeEditStatusDialog();
    } else {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn trạng thái mới.",
        severity: "warning",
      });
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await fetch(
          `http://localhost:5001/api/task/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await fetch(
          `http://localhost:5001/api/project/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects.");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
    fetchProjects();
  }, [setTasks, setFilteredTasks]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, tasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (filter.priority) {
      filtered = filtered.filter((task) => task.priority === filter.priority);
    }

    if (filter.search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          task.description?.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.project) {
      filtered = filtered.filter((task) => task.project === filter.project);
    }

    if (filter.sortBy === "dueDate") {
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate)
      );
    } else if (filter.sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    } else if (filter.sortBy === "title") {
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    }

    setFilteredTasks(filtered);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#e0f7fa", minHeight: "100vh" }}>
      <Paper
        sx={{ padding: 3, marginBottom: 3, boxShadow: 4, borderRadius: 2 }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, color: "#00796b" }}>
            Task Management
          </Typography>
          <IconButton onClick={applyFilters} color="primary">
            <SortIcon />
          </IconButton>
        </Toolbar>
        <Grid container spacing={3} alignItems="center" sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Tasks"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Enter keywords..."
              InputProps={{
                endAdornment: <SortIcon />,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                name="priority"
                value={filter.priority}
                onChange={handleFilterChange}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Project</InputLabel>
              <Select
                label="Project"
                name="project"
                value={filter.project}
                onChange={handleFilterChange}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value="">All</MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                label="Sort By"
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isOwner =
              task.project_owner._id ===
              jwtDecode(localStorage.getItem("token")).id;

            return (
              <Grid item xs={12} key={task._id}>
                <StyledPaper
                  sx={{
                    borderLeftColor:
                      task.priority === "High"
                        ? "error.main"
                        : task.priority === "Medium"
                        ? "warning.main"
                        : "success.main",
                    backgroundColor: "#ffffff",
                  }}
                  onClick={() =>
                    navigate(`/task-details/${task._id}`, {
                      state: { task, isOwner },
                    })
                  }
                >
                  <Box flex={1}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#004d40" }}
                    >
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.status} • Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, color: "#555555" }}
                    >
                      {task.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Project: {task.project_details.name || "Unknown"}
                    </Typography>
                  </Box>
                  {/* Thêm Box chứa các nút hành động */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mb: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkComplete(task._id);
                      }}
                      disabled={task.status === "Completed"}
                    >
                      Đánh dấu hoàn thành
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditStatusDialog(task._id, task.status);
                      }}
                    >
                      Sửa trạng thái
                    </Button>
                  </Box>
                  <Chip
                    label={task.priority}
                    color={
                      task.priority === "High"
                        ? "error"
                        : task.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </StyledPaper>
              </Grid>
            );
          })
        ) : (
          <Typography
            variant="h6"
            sx={{ mt: 4, width: "100%", textAlign: "center", color: "#00796b" }}
          >
            No tasks available.
          </Typography>
        )}
      </Grid>

      {/* Dialog Sửa Trạng Thái */}
      <Dialog open={editStatusDialog.open} onClose={closeEditStatusDialog}>
        <DialogTitle>Sửa Trạng Thái Công Việc</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              label="Trạng thái"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="Not Started">Chưa bắt đầu</MenuItem>
              <MenuItem value="In Progress">Đang thực hiện</MenuItem>
              <MenuItem value="Completed">Hoàn thành</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditStatusDialog}>Hủy</Button>
          <Button
            onClick={handleSaveEditStatus}
            variant="contained"
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default TaskListPage;
