// import React from "react";
// import { Box, TextField, MenuItem } from "@mui/material";

// const FilterBar = () => {
//   return (
//     <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//       <TextField
//         label="Lọc theo thời gian"
//         select
//         variant="outlined"
//         // size="small"
//         defaultValue=""
//         sx={{ width: "400px" }}
//       >
//         <MenuItem value="">Tất cả</MenuItem>
//         <MenuItem value="today">Hôm nay</MenuItem>
//         <MenuItem value="this_week">Tuần này</MenuItem>
//         <MenuItem value="this_month">Tháng này</MenuItem>
//       </TextField>
//     </Box>
//   );
// };

// export default FilterBar;

import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";

const FilterBar = ({ tasks, setFilteredTasks }) => {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  // Hàm xử lý bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  const applyFilter = () => {
    const start = new Date(filter.startDate);
    const end = new Date(filter.endDate);

    const filtered = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate); // Giả sử mỗi task có trường `dueDate`
      return dueDate >= start && dueDate <= end;
    });

    setFilteredTasks(filtered);
  };
  return (
    <Box>
      {/* Bộ lọc */}
      <Box display="flex" gap={2} marginBottom={2}>
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
        <Button variant="contained" color="primary" onClick={applyFilter}>
          Áp dụng
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;
