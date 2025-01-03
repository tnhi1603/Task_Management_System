import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
  IconButton,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    startDate: "",
    dueDate: "",
    assignedMember: null,
  });
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [openTaskMemberDialog, setOpenTaskMemberDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTaskMember, setSelectedTaskMember] = useState(null);

  // New states for editing task
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Not Started",
    startDate: "",
    dueDate: "",
    idUser: null,
  });

  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get User ID from Token
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const isOwner = project && userId === project.owner._id;

  const handleOpenSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/project/${id}`
      );
      setProject(response.data);
      setEditedProject({
        name: response.data.name || "",
        description: response.data.description || "",
        startDate: response.data.startDate
          ? response.data.startDate.split("T")[0]
          : "",
        dueDate: response.data.dueDate
          ? response.data.dueDate.split("T")[0]
          : "",
      });
      setSelectedMembers(response.data.members.map((m) => m._id));
    } catch (error) {
      console.error("Error fetching project:", error);
      handleOpenSnackbar("Cannot fetch project data.", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/user/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      handleOpenSnackbar("Cannot fetch users.", "error");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchUsers();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/project/${id}`,
        editedProject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      fetchProject();
      handleOpenSnackbar("Project updated successfully.", "success");
    } catch (error) {
      console.error("Error updating project:", error);
      handleOpenSnackbar("Error updating project.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleOpenSnackbar("Project deleted.", "success");
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      handleOpenSnackbar("Error deleting project.", "error");
    }
  };

  const handleTaskInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      await axios.post(
        `http://localhost:5001/api/task/`,
        {
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          startDate: newTask.startDate,
          dueDate: newTask.dueDate,
          project: id,
          idUser: newTask.assignedMember,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProject();
      setOpenTaskDialog(false);
      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        assignedMember: null,
      });
      handleOpenSnackbar("Task added successfully.", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      handleOpenSnackbar("Error adding task.", "error");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/api/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProject();
      handleOpenSnackbar("Task deleted.", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      handleOpenSnackbar("Error deleting task.", "error");
    }
  };

  const handleOpenMemberDialog = () => setOpenMemberDialog(true);
  const handleCloseMemberDialog = () => setOpenMemberDialog(false);

  const handleUpdateMembers = async () => {
    try {
      await axios.patch(
        `http://localhost:5001/api/project/${id}/members`,
        { members: selectedMembers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProject();
      handleCloseMemberDialog();
      handleOpenSnackbar("Members updated.", "success");
    } catch (error) {
      console.error("Error updating members:", error);
      handleOpenSnackbar("Error updating members.", "error");
    }
  };

  const handleOpenTaskMemberDialog = (task) => {
    setTaskToEdit(task);
    setSelectedTaskMember(task.idUser?._id || null);
    setOpenTaskMemberDialog(true);
  };
  const handleCloseTaskMemberDialog = () => setOpenTaskMemberDialog(false);

  const handleUpdateTaskMember = async () => {
    try {
      if (!taskToEdit || !selectedTaskMember) return;
      await axios.patch(
        `http://localhost:5001/api/task/${taskToEdit._id}/members`,
        { idUser: selectedTaskMember },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProject();
      handleCloseTaskMemberDialog();
      handleOpenSnackbar("Task member updated.", "success");
    } catch (error) {
      console.error("Error updating task member:", error);
      handleOpenSnackbar("Error updating task member.", "error");
    }
  };

  // New function to handle opening edit task dialog
  const handleOpenEditTaskDialog = (task) => {
    setTaskToEdit(task);
    setEditedTask({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Medium",
      status: task.status || "Not Started",
      startDate: task.startDate ? task.startDate.split("T")[0] : "",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      idUser: task.idUser?._id || null,
    });
    setOpenEditTaskDialog(true);
  };

  // New function to handle input changes in edit task dialog
  const handleEditTaskChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  // New function to handle saving edited task
  const handleSaveEditedTask = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/task/${taskToEdit._id}`,
        editedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProject();
      setOpenEditTaskDialog(false);
      handleOpenSnackbar("Task updated successfully.", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      handleOpenSnackbar("Error updating task.", "error");
    }
  };

  // New function to get project members
  const getProjectMembers = () => {
    return users.filter((user) =>
      project.members.some((member) => member._id === user._id)
    );
  };

  if (!project) return <Typography>Loading...</Typography>;

  return (
    <Box padding={4}>
      {!isEditing ? (
        <>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {project.description}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Chip label={project.status} color="primary" />
            <Box ml={2}>
              <Typography variant="body2">
                Progress: {project.progress?.toFixed(2)}%
              </Typography>
              <LinearProgress variant="determinate" value={project.progress} />
            </Box>
          </Box>
          <Typography variant="body1" gutterBottom>
            Start Date: {new Date(project.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Due Date: {new Date(project.dueDate).toLocaleDateString()}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Owner</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{project.owner.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={project.owner.name}
                secondary={project.owner.email}
              />
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ mr: 2 }}>
              Members
            </Typography>
            {isOwner && (
              <IconButton color="primary" onClick={handleOpenMemberDialog}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <List>
            {project.members
              .filter((member) => member._id !== project.owner._id)
              .map((member) => (
                <ListItem key={member._id}>
                  <ListItemAvatar>
                    <Avatar>{member.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    secondary={member.email}
                  />
                </ListItem>
              ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Tasks</Typography>
          <Box mt={2}>
            {project.tasks.map((task) => (
              <Box
                key={task._id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {task.title} (Priority: {task.priority})
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {task.description}
                </Typography>
                <Typography variant="body2">
                  Status: {task.status} | Start:{" "}
                  {new Date(task.startDate).toLocaleDateString()} | Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 1 }}>
                      {task.idUser?.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {task.idUser?.name} - {task.idUser?.email}
                    </Typography>
                  </Box>
                  {isOwner && (
                    <Box>
                      <IconButton
                        onClick={() => handleOpenTaskMemberDialog(task)}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <PersonIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenEditTaskDialog(task)}
                        color="secondary"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTask(task._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          {isOwner && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                sx={{ mr: 2 }}
              >
                Edit Project
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete Project
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => setOpenTaskDialog(true)}
                sx={{ ml: 2 }}
              >
                Add Task
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          <TextField
            label="Project Name"
            name="name"
            fullWidth
            value={editedProject.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={editedProject.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            value={editedProject.startDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            value={editedProject.dueDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleEditToggle}>
              Cancel
            </Button>
          </Box>
        </>
      )}

      {/* Existing Dialogs */}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            name="title"
            fullWidth
            value={newTask.title}
            onChange={handleTaskInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={newTask.description}
            onChange={handleTaskInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Priority"
            name="priority"
            select
            fullWidth
            value={newTask.priority}
            onChange={handleTaskInputChange}
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </TextField>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            value={newTask.startDate}
            onChange={handleTaskInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            value={newTask.dueDate}
            onChange={handleTaskInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.name + " - " + option.email}
            value={
              newTask.assignedMember
                ? users.find((u) => u._id === newTask.assignedMember)
                : null
            }
            onChange={(_, value) =>
              setNewTask({ ...newTask, assignedMember: value?._id || null })
            }
            renderInput={(params) => (
              <TextField {...params} label="Assign to Member" sx={{ mb: 2 }} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="success">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
        <DialogTitle>Edit Project Members</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            options={users}
            getOptionLabel={(option) => option.name + " - " + option.email}
            value={users.filter((u) => selectedMembers.includes(u._id))}
            onChange={(_, value) => {
              setSelectedMembers(value.map((v) => v._id));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Members" />
            )}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMemberDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateMembers} color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskMemberDialog} onClose={handleCloseTaskMemberDialog}>
        <DialogTitle>Edit Task Member</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={getProjectMembers()}
            getOptionLabel={(option) => option.name + " - " + option.email}
            value={users.find((u) => u._id === selectedTaskMember) || null}
            onChange={(_, value) => {
              setSelectedTaskMember(value?._id || null);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Member" />
            )}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskMemberDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTaskMember} color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Edit Task Dialog */}
      <Dialog
        open={openEditTaskDialog}
        onClose={() => setOpenEditTaskDialog(false)}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            name="title"
            fullWidth
            value={editedTask.title}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Priority"
            name="priority"
            select
            fullWidth
            value={editedTask.priority}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </TextField>
          <TextField
            label="Status"
            name="status"
            select
            fullWidth
            value={editedTask.status}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </TextField>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            value={editedTask.startDate}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            value={editedTask.dueDate}
            onChange={handleEditTaskChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            options={getProjectMembers()}
            getOptionLabel={(option) => option.name + " - " + option.email}
            value={
              editedTask.idUser
                ? users.find((u) => u._id === editedTask.idUser)
                : null
            }
            onChange={(_, value) =>
              setEditedTask({ ...editedTask, idUser: value?._id || null })
            }
            renderInput={(params) => (
              <TextField {...params} label="Assign to Member" sx={{ mb: 2 }} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditTaskDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditedTask} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectDetailPage;
