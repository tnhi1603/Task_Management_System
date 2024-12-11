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
  // const tasks = [
  //   {
  //     id: 1,
  //     title: "Hoàn thành báo cáo",
  //     dueDate: "2024-12-05",
  //     priority: "High",
  //   },
  //   { id: 2, title: "Họp nhóm", dueDate: "2024-12-07", priority: "Medium" },
  //   {
  //     id: 3,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 4,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 5,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 6,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 7,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 8,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  //   {
  //     id: 9,
  //     title: "Thiết kế giao diện",
  //     dueDate: "2024-12-09",
  //     priority: "Low",
  //   },
  // ];

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
