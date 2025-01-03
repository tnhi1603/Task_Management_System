import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split("T")[0];
    })(),
    status: "Active",
    members: [],
  });

  const [projects, setProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [projectStats, setProjectStats] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
      const userId = decodedToken?.id;
      const response = await axios.get(
        `http://localhost:5001/api/project/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects(response.data);
      fetchStatistics(response.data, token);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchStatistics = async (projectsData, token) => {
    try {
      const statsPromises = projectsData.map((project) =>
        axios.get(
          `http://localhost:5001/api/project/${project._id}/statistics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );
      const statsResponses = await Promise.all(statsPromises);
      const stats = {};
      statsResponses.forEach((res, index) => {
        stats[projectsData[index]._id] = res.data;
      });
      setProjectStats(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.description) {
      alert("Vui lòng điền vào các trường bắt buộc: Tên và Mô tả");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/project", newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenAddForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  return (
    <Box
      padding={4}
      bgcolor={theme.palette.background.default}
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom color="primary">
        Projects
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenAddForm(true)}
        sx={{ mb: 3 }}
      >
        Add Project
      </Button>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar>{project.name.charAt(0)}</Avatar>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    gutterBottom
                    ml={2}
                  >
                    {project.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {project.description}
                </Typography>
                <Chip
                  label={project.status}
                  color={project.status === "Active" ? "success" : "default"}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Start: {new Date(project.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </Typography>
                {projectStats[project._id] && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Progress:</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={projectStats[project._id].progress}
                      sx={{ height: 10, borderRadius: 5, mt: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {projectStats[project._id].progress.toFixed(2)}%
                    </Typography>
                  </Box>
                )}
                <Box mt={2}>
                  <Typography variant="subtitle2">Members:</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {project.members.map((member) => (
                      <Tooltip title={member.name} key={member._id}>
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{ width: 24, height: 24, mr: 1, mb: 1 }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openAddForm}
        onClose={() => setOpenAddForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate>
            <TextField
              required
              label="Project Name"
              name="name"
              fullWidth
              margin="normal"
              value={newProject.name}
              onChange={handleInputChange}
            />
            <TextField
              required
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newProject.description}
              onChange={handleInputChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Start Date"
                  name="startDate"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={newProject.dueDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <TextField
              label="Status"
              name="status"
              select
              SelectProps={{ native: true }}
              fullWidth
              margin="normal"
              value={newProject.status}
              onChange={handleInputChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </TextField>
            <Autocomplete
              multiple
              options={allUsers}
              getOptionLabel={(option) => option.name || option.email}
              onChange={(_, value) => {
                setNewProject({
                  ...newProject,
                  members: value.map((v) => v._id),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Members"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddForm(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddProject}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectPage;
