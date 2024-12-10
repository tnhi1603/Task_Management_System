import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Badge,
  Grid,
  Tab,
  Tabs,
  Fade,
  Container,
  Chip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaBell, FaCheck, FaTrash, FaFilter } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: "16px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_task",
      title: "New Project Assignment",
      description: "You have been assigned to the new AI Development project",
      timestamp: "2024-01-20T10:30:00",
      read: false,
    },
    {
      id: 2,
      type: "task_update",
      title: "Task Status Updated",
      description:
        "Website redesign project status has been updated to 'In Progress'",
      timestamp: "2024-01-20T09:15:00",
      read: true,
    },
    {
      id: 3,
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Mobile App Development project deadline is approaching",
      timestamp: "2024-01-20T08:45:00",
      read: false,
    },
    {
      id: 4,
      type: "expired_deadline",
      title: "Deadline Expired",
      description: "The deadline for the UI/UX Design project has expired",
      timestamp: "2024-01-19T23:59:59",
      read: false,
    },
    {
      id: 5,
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Mobile App Development project deadline is approaching",
      timestamp: "2024-01-20T08:45:00",
      read: false,
    },
    {
      id: 6,
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Mobile App Development project deadline is approaching",
      timestamp: "2024-01-20T08:45:00",
      read: false,
    },
    {
      id: 7,
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Mobile App Development project deadline is approaching",
      timestamp: "2024-01-20T08:45:00",
      read: false,
    },
  ]);

  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("all"); // Added filter state

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (type) => {
    if (type && typeof type === "string") {
      setFilterType(type);
    }
    setAnchorEl(null);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "new_task":
        return "#2196f3";
      case "task_update":
        return "#4caf50";
      case "deadline":
        return "#f44336";
      case "expired_deadline":
        return "#9c27b0";
      default:
        return "#757575";
    }
  };

  const filterNotifications = () => {
    let filtered = notifications;

    // Apply read/unread filter
    if (filterType === "unread") {
      filtered = filtered.filter((notif) => !notif.read);
    } else if (filterType === "read") {
      filtered = filtered.filter((notif) => notif.read);
    }

    // Apply tab filter
    if (currentTab !== 0) {
      const types = ["new_task", "task_update", "deadline", "expired_deadline"];
      filtered = filtered.filter(
        (notif) => notif.type === types[currentTab - 1]
      );
    }

    return filtered;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        <Button
          startIcon={<FaFilter />}
          onClick={handleFilterClick}
          variant="outlined"
          aria-label="filter notifications"
        >
          Filter
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleFilterClose()}
      >
        <MenuItem onClick={() => handleFilterClose("all")}>All</MenuItem>
        <MenuItem onClick={() => handleFilterClose("unread")}>Unread</MenuItem>
        <MenuItem onClick={() => handleFilterClose("read")}>Read</MenuItem>
      </Menu>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="notification tabs"
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="New Tasks" />
        <Tab label="Updates" />
        <Tab label="Deadlines" />
        <Tab label="Expired Deadlines" />
      </Tabs>

      <Grid container spacing={2}>
        {filterNotifications().map((notification) => (
          <Grid item xs={12} key={notification.id}>
            <Fade in={true}>
              <StyledCard
                sx={{
                  bgcolor: notification.read
                    ? "background.default"
                    : "action.hover",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Badge
                        color="error"
                        variant="dot"
                        invisible={notification.read}
                      >
                        <FaBell color={getTypeColor(notification.type)} />
                      </Badge>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            fontWeight: notification.read ? "normal" : "bold",
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            fontWeight: notification.read ? "normal" : "bold",
                          }}
                        >
                          {notification.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1, display: "block" }}
                        >
                          {new Date(notification.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Chip
                        label={notification.type
                          .replace("_", " ")
                          .toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getTypeColor(notification.type),
                          color: "white",
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton
                          onClick={() => markAsRead(notification.id)}
                          disabled={notification.read}
                          aria-label="mark as read"
                          size="small"
                        >
                          <FaCheck />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteNotification(notification.id)}
                          aria-label="delete notification"
                          size="small"
                          color="error"
                        >
                          <FaTrash />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notifications;
