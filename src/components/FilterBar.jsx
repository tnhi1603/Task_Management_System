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
        label="Status"
        name="status"
        select
        value={filter.status}
        onChange={handleFilterChange}
        style={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Not Started">Not Started</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        InputLabelProps={{ shrink: true }}
        value={filter.startDate}
        onChange={handleFilterChange}
      />
      <TextField
        label="End Date"
        type="date"
        name="endDate"
        InputLabelProps={{ shrink: true }}
        value={filter.endDate}
        onChange={handleFilterChange}
      />
      <TextField
        label="Keyword"
        name="keyword"
        value={filter.keyword}
        onChange={handleFilterChange}
        style={{ flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={applyFilter}>
        Apply
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetFilter}>
        Reset
      </Button>
    </Box>
  );
};

export default FilterBar;
