// Task_Management_System/src/components/FilterBar.jsx

import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const FilterBar = ({ onFilter }) => {
  const [filter, setFilter] = useState({
    status: "",
    startDate: "",
    endDate: "",
    keyword: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    onFilter(filter);
  };

  const resetFilter = () => {
    setFilter({
      status: "",
      startDate: "",
      endDate: "",
      keyword: "",
    });
    onFilter({});
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        label="Trạng Thái"
        name="status"
        select
        value={filter.status}
        onChange={handleFilterChange}
        style={{ minWidth: 150 }}
      >
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value="Đang chạy">Đang chạy</MenuItem>
        <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
        <MenuItem value="Đã đóng">Đã đóng</MenuItem>
      </TextField>
      <TextField
        label="Từ ngày"
        type="date"
        name="startDate"
        InputLabelProps={{ shrink: true }}
        value={filter.startDate}
        onChange={handleFilterChange}
      />
      <TextField
        label="Đến ngày"
        type="date"
        name="endDate"
        InputLabelProps={{ shrink: true }}
        value={filter.endDate}
        onChange={handleFilterChange}
      />
      <TextField
        label="Từ Khóa"
        name="keyword"
        value={filter.keyword}
        onChange={handleFilterChange}
        style={{ flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={applyFilter}>
        Áp dụng
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetFilter}>
        Đặt Lại
      </Button>
    </Box>
  );
};

export default FilterBar;
