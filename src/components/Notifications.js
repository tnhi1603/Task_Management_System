import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
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
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]); // State to store user tasks
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false); // Loading state for tasks
  const [newNotification, setNewNotification] = useState({
    content: "",
    type: "Update",
    taskId: "",
  });

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/notification",
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error("Invalid data format from API:", response.data);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch user tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const fetchTasks = async () => {
      try {
        setLoadingTasks(true);
        const response = await axios.get(
          `http://localhost:5001/api/tasks/${userId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, []);

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

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleInputChange = (e) => {
    setNewNotification({
      ...newNotification,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/notification",
        newNotification
      );
      setNotifications((prev) => [...prev, response.data]);
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5001/api/notification/${id}/read`);
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notification/${id}`);
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Reminder":
        return "#2196f3";
      case "Overdue":
        return "#f44336";
      case "Update":
        return "#4caf50";
      case "Project":
        return "#9c27b0";
      case "System":
        return "#ff9800";
      case "Comment":
        return "#00bcd4";
      case "Assignment":
        return "#8bc34a";
      default:
        return "#757575";
    }
  };

  const filterNotifications = () => {
    if (!notifications || notifications.length === 0) return [];

    let filtered = notifications;

    if (filterType === "unread") {
      filtered = filtered.filter((notif) => !notif.isRead);
    } else if (filterType === "read") {
      filtered = filtered.filter((notif) => notif.isRead);
    }

    if (currentTab !== 0) {
      const types = [
        "Reminder",
        "Overdue",
        "Update",
        "Project",
        "System",
        "Comment",
        "Assignment",
      ];
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
        <Box>
          <Button
            startIcon={<FaFilter />}
            onClick={handleFilterClick}
            variant="outlined"
            aria-label="filter notifications"
            sx={{ mr: 2 }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
            aria-label="create notification"
          >
            Create Notification
          </Button>
        </Box>
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
        <Tab label="Reminder" />
        <Tab label="Overdue" />
        <Tab label="Update" />
        <Tab label="Project" />
        <Tab label="System" />
        <Tab label="Comment" />
        <Tab label="Assignment" />
      </Tabs>

      <Grid container spacing={2}>
        {filterNotifications().map((notification) => (
          <Grid item xs={12} key={notification._id}>
            <Fade in={true}>
              <StyledCard
                sx={{
                  bgcolor: notification.isRead
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
                        invisible={notification.isRead}
                      >
                        <FaBell color={getTypeColor(notification.type)} />
                      </Badge>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            fontWeight: notification.isRead ? "normal" : "bold",
                          }}
                        >
                          {notification.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1, display: "block" }}
                        >
                          {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Chip
                        label={notification.type.toUpperCase()}
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
                          onClick={() => markAsRead(notification._id)}
                          disabled={notification.isRead}
                          aria-label="mark as read"
                          size="small"
                        >
                          <FaCheck />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteNotification(notification._id)}
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

      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create New Notification
          </Typography>
          <TextField
            label="Content"
            name="content"
            fullWidth
            value={newNotification.content}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={newNotification.type}
              onChange={handleInputChange}
            >
              <MenuItem value="Reminder">Nhắc nhở</MenuItem>
              <MenuItem value="Overdue">Trễ hạn</MenuItem>
              <MenuItem value="Update">Cập nhật</MenuItem>
              <MenuItem value="Project">Cập nhật dự án</MenuItem>
              <MenuItem value="System">Thông báo hệ thống</MenuItem>
              <MenuItem value="Comment">Bình luận</MenuItem>
              <MenuItem value="Assignment">Phân công</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Task</InputLabel>
            {loadingTasks ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                name="taskId"
                value={newNotification.taskId}
                onChange={handleInputChange}
              >
                {tasks.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleModalClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleFormSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Notifications;
