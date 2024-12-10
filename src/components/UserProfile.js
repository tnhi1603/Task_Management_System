import React, { useState, useRef } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiEdit, FiLock, FiX, FiUpload } from "react-icons/fi";
import {
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaProjectDiagram,
} from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));
const InfoContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  transition: "opacity 0.3s ease",
}));
const AvatarOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    opacity: 1,
  },
}));

const UserProfile = () => {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Senior UX Designer",
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "San Francisco",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    company: "TechCorp Solutions",
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform using React and Node.js",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028",
      },
      {
        id: 2,
        title: "Portfolio Website",
        description: "Designed and developed a responsive portfolio website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Designed and developed a responsive portfolio website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        id: 2,
        title: "Portfolio Website",
        description: "Designed and developed a responsive portfolio website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
      {
        id: 2,
        title: "Portfolio Website",
        description: "Designed and developed a responsive portfolio website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      },
    ],
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleProfileUpdate = () => {
    setIsEditMode(false);
    setSnackbar({
      open: true,
      message: "Profile updated successfully!",
      severity: "success",
    });
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      setIsPasswordDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
      setSnackbar({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
    }
  };
  const handleAvatarClick = () => {
    setIsImageDialogOpen(true);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, avatar: e.target.result });
        setSnackbar({
          open: true,
          message: "Profile picture updated successfully!",
          severity: "success",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLocalUpload = () => {
    fileInputRef.current.click();
    setIsImageDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Personal Information Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  mx: "auto",
                }}
              >
                <Avatar
                  src={profile.avatar}
                  alt={profile.name}
                  sx={{ width: "100%", height: "100%" }}
                />
                <AvatarOverlay onClick={handleAvatarClick}>
                  <FiUpload color="white" size={24} />
                  <Typography color="white" variant="caption" sx={{ mt: 1 }}>
                    Upload Photo
                  </Typography>
                </AvatarOverlay>
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />

              <IconButton
                sx={{ position: "absolute", right: 0, top: 0 }}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <FiEdit />
              </IconButton>
            </Box>

            {isEditMode ? (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Title"
                  value={profile.title}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Company"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  margin="normal"
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleProfileUpdate}
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              </Box>
            ) : (
              <Box>
                <InfoContainer>
                  <div style={{ marginBottom: "2rem" }}>
                    <h2>{profile.name}</h2>
                  </div>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {profile.title}
                  </div>

                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <FaBriefcase />
                    &nbsp;&nbsp; {profile.company}
                  </div>

                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <FaEnvelope />
                    &nbsp;&nbsp;{profile.email}
                  </div>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <FaPhone />
                    &nbsp;&nbsp;{profile.phone}
                  </div>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "bold",
                      marginBottom: "13rem",
                    }}
                  >
                    <FaMapMarkerAlt />
                    &nbsp;&nbsp;{profile.location}
                  </div>
                </InfoContainer>
                <Button
                  startIcon={<FiLock />}
                  variant="outlined"
                  fullWidth
                  onClick={() => setIsPasswordDialogOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Projects Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            My Projects
          </Typography>
          <Grid container spacing={3}>
            {profile.projects.map((project) => (
              <Grid item xs={12} sm={6} key={project.id}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      >
        <DialogTitle>
          Change Password
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setIsPasswordDialogOpen(false)}
          >
            <FiX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPasswordDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
      {/* Image Upload Dialog */}
      <Dialog
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
      >
        <DialogTitle>
          Upload Profile Picture
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setIsImageDialogOpen(false)}
          >
            <FiX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FiUpload />}
            onClick={handleLocalUpload}
            sx={{ mb: 2 }}
          >
            Upload from Device
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
