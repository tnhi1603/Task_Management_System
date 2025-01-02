import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
} from "@mui/material";

const TaskListPage = ({ tasks, setTasks, setFilteredTasks, filteredTasks = [] }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    project: "",
    priority: "",
    sortBy: "dueDate",
  });
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/task/");
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

    fetchTasks();
  }, [setTasks, setFilteredTasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (filter.priority) {
      filtered = filtered.filter((task) => task.priority === filter.priority);
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
    <Box sx={{ marginTop: "64px", padding: 2 }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Ưu tiên"
              select
              name="priority"
              value={filter.priority}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="High">Cao</MenuItem>
              <MenuItem value="Medium">Trung bình</MenuItem>
              <MenuItem value="Low">Thấp</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sắp xếp theo</InputLabel>
              <Select
                label="Sắp xếp theo"
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
              >
                <MenuItem value="dueDate">Ngày hoàn thành</MenuItem>
                <MenuItem value="priority">Mức độ ưu tiên</MenuItem>
                <MenuItem value="title">Tên công việc</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={applyFilters}
            >
              Áp dụng ({sortOrder === "asc" ? "↑" : "↓"})
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Grid item xs={12} md={6} key={task._id}>
              <Paper
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    // src={task.assigned_users.avatar}
                    // alt={task.assigned_users.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box flex={1}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {task.title}
                    </Typography>
                    <Chip
                      label={task.priority}
                      size="small"
                      sx={{
                        backgroundColor:
                          task.priority === "High"
                            ? "#ffebee"
                            : task.priority === "Medium"
                            ? "#fff3e0"
                            : "#e8f5e9",
                        color:
                          task.priority === "High"
                            ? "#c62828"
                            : task.priority === "Medium"
                            ? "#ef6c00"
                            : "#2e7d32",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Dự án: {task.project_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {task.status} • Hạn:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>No tasks available.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default TaskListPage;
