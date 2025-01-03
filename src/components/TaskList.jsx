import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const TaskList = ({ filteredTasks }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const formatDueDate = (date) => {
    const options = {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("vi-VN", options);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Công Việc Sắp Đến Hạn
      </Typography>
      <List>
        {filteredTasks.map((task) => (
          <React.Fragment key={task.id}>
            <ListItem>
              <ListItemText
                primary={task.title}
                secondary={`Hạn chót: ${formatDueDate(task.dueDate)}`}
              />
              <Chip
                label={task.priority}
                color={getPriorityColor(task.priority)}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
