import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AvatarGroup,
  IconButton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    owner: "John Doe",
    description: "Building a scalable e-commerce solution",
    status: "In Progress",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    teamMembers: [
      {
        name: "Alice",
        avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        name: "Bob",
        avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
      },
      {
        name: "Charlie",
        avatar: "images.unsplash.com/photo-1527980965255-d3b416303d12",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Frontend Development",
        description: "Implement user interface",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        status: "in progress",
      },
      {
        id: 2,
        title: "Backend Integration",
        description: "Setup API endpoints",
        startDate: "2024-02-01",
        endDate: "2024-04-30",
        status: "not started",
      },
      {
        id: 3,
        title: "Testing",
        description: "Perform unit and integration tests",
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        status: "not started",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    owner: "Jane Smith",
    description: "Developing a fitness tracking application",
    status: "Completed",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    teamMembers: [
      {
        name: "David",
        avatar: "images.unsplash.com/photo-1568602471122-7832951cc4c5",
      },
      {
        name: "Eva",
        avatar: "images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "UI Design",
        description: "Design user interfaces",
        startDate: "2023-07-01",
        endDate: "2023-08-31",
        status: "completed",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "completed",
      },
      {
        id: 3,
        title: "Testing",
        description: "Quality assurance",
        startDate: "2023-10-01",
        endDate: "2023-12-31",
        status: "completed",
      },
    ],
  },
  {
    id: 3,
    name: "Web Development",
    owner: "Jane Smith",
    description: "Developing a fitness tracking application",
    status: "Completed",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    teamMembers: [
      {
        name: "David",
        avatar: "images.unsplash.com/photo-1568602471122-7832951cc4c5",
      },
      {
        name: "Eva",
        avatar: "images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "UI Design",
        description: "Design user interfaces",
        startDate: "2023-07-01",
        endDate: "2023-08-31",
        status: "completed",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "completed",
      },
      {
        id: 3,
        title: "Testing",
        description: "Quality assurance",
        startDate: "2023-10-01",
        endDate: "2023-12-31",
        status: "completed",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "in progress",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "not started",
      },
    ],
  },
  {
    id: 4,
    name: "App Web Development",
    owner: "Jane Smith",
    description: "Developing a fitness tracking application",
    status: "Completed",
    startDate: "2023-07-23",
    endDate: "2023-12-31",
    teamMembers: [
      {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        name: "Eva",
        avatar: "images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
      {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "UI Design",
        description: "Design user interfaces",
        startDate: "2023-07-01",
        endDate: "2023-08-31",
        status: "completed",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "completed",
      },
      {
        id: 3,
        title: "Testing",
        description: "Quality assurance",
        startDate: "2023-10-01",
        endDate: "2023-12-31",
        status: "completed",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "in progress",
      },
      {
        id: 2,
        title: "API Integration",
        description: "Integrate with backend services",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "not started",
      },
    ],
  },
];

const Management = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortByDate, setSortByDate] = useState("startDate");

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleFormOpen = (project = null) => {
    setFormData(project || {});
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = formData.id ? "updated" : "created";
    setShowAlert(action);
    setTimeout(() => setShowAlert(false), 3000);
    handleFormClose();
  };

  const sortProjects = (projects) => {
    const sorted = [...projects];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByDate === "startDate") {
      sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortByDate === "endDate") {
      sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }
    return sorted;
  };

  const FilterSection = () => (
    <Box mb={3} display="flex" gap={2}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort by Name</InputLabel>
        <Select
          value={sortBy}
          label="Sort by Name"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="name">Name (A-Z)</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort by Date</InputLabel>
        <Select
          value={sortByDate}
          label="Sort by Date"
          onChange={(e) => setSortByDate(e.target.value)}
        >
          <MenuItem value="startDate">Start Date</MenuItem>
          <MenuItem value="endDate">End Date</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const ProjectList = () => (
    <Grid container spacing={3}>
      {sortProjects(mockProjects).map((project) => (
        <Grid item xs={12} md={6} key={project.id}>
          <StyledCard onClick={() => handleProjectClick(project)}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">{project.name}</Typography>
                <Chip
                  label={project.status}
                  color={project.status === "Completed" ? "success" : "warning"}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" mb={2}>
                {project.description}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AvatarGroup max={4}>
                  {project.teamMembers.map((member, index) => (
                    <Avatar key={index} alt={member.name} src={member.avatar} />
                  ))}
                </AvatarGroup>
                <Typography variant="body2">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  const Statistics = () => {
    // Chuẩn bị dữ liệu trạng thái
    const data = mockProjects.map((project) => {
      const statusCounts = project.tasks.reduce(
        (counts, task) => {
          counts[task.status] = (counts[task.status] || 0) + 1;
          return counts;
        },
        { completed: 0, "in progress": 0, "not started": 0 }
      );

      return {
        name: project.name,
        Completed: statusCounts.completed,
        "In Progress": statusCounts["in progress"],
        "Not Started": statusCounts["not started"],
      };
    });

    return (
      <Box height={400} mt={4}>
        <Typography variant="h6" mb={2}>
          Task Status Overview
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Completed" stackId="a" fill="#4caf50" />
            <Bar dataKey="In Progress" stackId="a" fill="#ff9800" />
            <Bar dataKey="Not Started" stackId="a" fill="#f44336" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const ProjectDetail = ({ project }) => (
    <Box>
      <Button
        onClick={() => setSelectedProject(null)}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Back to Projects
      </Button>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5">{project.name}</Typography>
            <Box>
              <IconButton onClick={() => handleFormOpen(project)}>
                <FaEdit />
              </IconButton>
              <IconButton color="error">
                <FaTrash />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body1" mb={2}>
            {project.description}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            Owner: {project.owner}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            Duration: {new Date(project.startDate).toLocaleDateString()} -{" "}
            {new Date(project.endDate).toLocaleDateString()}
          </Typography>
          <Box mb={3}>
            <Typography variant="subtitle1" mb={1}>
              Team Members:
            </Typography>
            <AvatarGroup>
              {project.teamMembers.map((member, index) => (
                <Avatar key={index} alt={member.name} src={member.avatar} />
              ))}
            </AvatarGroup>
          </Box>
          <Typography variant="h6" mb={2}>
            Tasks
          </Typography>
          {project.tasks.map((task) => (
            <Card key={task.id} sx={{ mb: 2, p: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle1">{task.title}</Typography>
                <Chip
                  label={task.status}
                  color={
                    task.status === "completed"
                      ? "success"
                      : task.status === "in progress"
                      ? "warning"
                      : "default"
                  }
                />
              </Box>
              <Typography variant="body2" color="textSecondary" mb={1}>
                {task.description}
              </Typography>
              <Typography variant="body2">
                {new Date(task.startDate).toLocaleDateString()} -{" "}
                {new Date(task.endDate).toLocaleDateString()}
              </Typography>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Box>
  );

  const ProjectForm = () => (
    <Dialog open={isFormOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {formData.id ? "Edit Project" : "Add New Project"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Project Name"
            required
            margin="normal"
            defaultValue={formData.name}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            margin="normal"
            defaultValue={formData.description}
          />
          <TextField
            fullWidth
            label="Owner"
            required
            margin="normal"
            defaultValue={formData.owner}
          />
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            defaultValue={formData.startDate}
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            defaultValue={formData.endDate}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormClose}>Cancel</Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {formData.id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Project {showAlert} successfully!
        </Alert>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Project Management</Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => handleFormOpen()}
        >
          New Project
        </Button>
      </Box>
      {selectedProject ? (
        <ProjectDetail project={selectedProject} />
      ) : (
        <>
          <FilterSection />
          <ProjectList />
          <Statistics />
        </>
      )}
      <ProjectForm />
    </Container>
  );
};

export default Management;
