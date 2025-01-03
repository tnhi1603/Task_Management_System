import React from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TaskStats = ({ taskStatistics }) => {
  const { completedTasks, inProgressTasks, notStartedTasks } = taskStatistics;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "In Progress", value: inProgressTasks },
    { name: "Not Started", value: notStartedTasks },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Task Status Chart
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TaskStats;
