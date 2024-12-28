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
} from "@mui/material";

const TaskListPage = ({ tasks, setTasks, setFilteredTasks }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    project: "",
    priority: "",
    sortBy: "dueDate",
  });

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/task/");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const data = await response.json();
        setTasks(data); // Save all tasks to state
        setFilteredTasks(data); // Set filtered tasks initially to all tasks
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setFilteredTasks]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  // Apply filters to tasks
  const applyFilters = () => {
    const filtered = tasks.filter((task) =>
      filter.priority ? task.priority === filter.priority : true
    );

    const sorted = [...filtered].sort((a, b) => {
      if (filter.sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (filter.sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (filter.sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredTasks(sorted); // Pass sorted and filtered tasks back to parent
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
    <Box sx={{ marginTop: "64px" }}>
    <Box display="flex" gap={2} marginBottom={2}>
      {/* Filter components */}
      <TextField
        label="Ưu tiên"
        select
        name="priority"
        value={filter.priority}
        onChange={handleFilterChange}
        sx={{ width: "300px" }}
      >
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value="High">Cao</MenuItem>
        <MenuItem value="Medium">Trung bình</MenuItem>
        <MenuItem value="Low">Thấp</MenuItem>
      </TextField>

      <FormControl sx={{ width: "300px" }}>
        <InputLabel>Sắp xếp theo</InputLabel>
        <Select
          label="Sắp xếp theo"
          name="sortBy"
          value={filter.sortBy}
          onChange={handleFilterChange}
        >
          <MenuItem value="dueDate">Ngày hoàn thành</MenuItem>
          <MenuItem value="priority">Mức độ ưu tiên</MenuItem>
          <MenuItem value="name">Tên công việc</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={applyFilters}>
        Áp dụng
      </Button>
    </Box>
    {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên công việc</TableCell>
              <TableCell>Mức độ ưu tiên</TableCell>
              <TableCell>Ngày hoàn thành</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} setTasks={setTasks} />
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default TaskListPage;
