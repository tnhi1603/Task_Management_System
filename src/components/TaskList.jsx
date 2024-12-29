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
                secondary={`Hạn chót: ${task.dueDate}`}
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
