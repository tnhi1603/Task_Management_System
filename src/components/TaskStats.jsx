import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TaskStats = () => {
  const data = [
    { name: "Đã hoàn thành", value: 5 },
    { name: "Đang tiến hành", value: 8 },
    { name: "Chưa bắt đầu", value: 3 },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Biểu Đồ Trạng Thái Công Việc
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
};

export default TaskStats;
