import React, { useState } from "react";
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

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Box sx={{ marginTop: "64px" }}> {/* Thêm khoảng cách từ đầu lề */}
      {/* Bộ lọc */}
      <Box display="flex" gap={2} marginBottom={2}>
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