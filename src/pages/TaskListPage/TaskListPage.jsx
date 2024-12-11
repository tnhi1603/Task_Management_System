import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import TaskItem from "./TaskItem";

const TaskListPage = ({ tasksBefore, filteredTasks }) => {
  const [tasks, setTasks] = useState(tasksBefore); // Danh sách công việc
  const [filter, setFilter] = useState({
    project: "",
    priority: "",
    sortBy: "dueDate", // Mặc định sắp xếp theo ngày hoàn thành
  });

  //   Lấy dữ liệu công việc từ backend
  //   useEffect(() => {
  //     const fetchTasks = async () => {
  //       const response = await axios.get("/api/tasks", { params: filter });
  //       setTasks(response.data);
  //     };
  //     fetchTasks();
  //   }, [filter]);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Box>
      {/* Bộ lọc */}
      <Box display="flex" gap={2} marginBottom={2}>
        {/* <TextField
          label="Dự án"
          select
          name="project"
          value={filter.project}
          onChange={handleFilterChange}
          sx={{ width: "300px" }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Project1">Dự án 1</MenuItem>
          <MenuItem value="Project2">Dự án 2</MenuItem>
    
        </TextField> */}

        <TextField
          label="Ưu tiên"
          select
          name="priority"
          value={filter.priority}
          onChange={handleFilterChange}
          // fullWidth
          sx={{ width: "300px" }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="High">Cao</MenuItem>
          <MenuItem value="Medium">Trung bình</MenuItem>
          <MenuItem value="Low">Thấp</MenuItem>
        </TextField>

        <FormControl
          // fullWidth
          sx={{ width: "300px" }}
        >
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilter({ ...filter })}
        >
          Áp dụng
        </Button>
      </Box>

      {/* Danh sách công việc */}
      <TableContainer>
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
      </TableContainer>
    </Box>
  );
};

export default TaskListPage;
