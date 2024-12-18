import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import axios
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
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiEdit, FiLock, FiX, FiUpload } from "react-icons/fi";
import {
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
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

const AvatarOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
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

const UserProfile = ({ userId }) => {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
    company: "",
    projects: [],
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Fetch user data from API
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const userData = response.data;
        setProfile({
          name: userData.name,
          title: userData.title || "N/A",
          email: userData.email,
          phone: userData.phone || "N/A",
          location: userData.location || "N/A",
          avatar: userData.avatar || "",
          company: userData.company || "N/A",
          projects: userData.projects || [],
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch user profile. Please try again later.",
          severity: "error",
        });
      }
    };

    fetchUserProfile();
  }, [userId]); // Run effect whenever `userId` changes

  const handleProfileUpdate = () => {
    setIsEditMode(false);
    setSnackbar({
      open: true,
      message: "Profile updated successfully!",
      severity: "success",
    });
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

  const handleAvatarClick = () => {
    fileInputRef.current.click();
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
            </Box>

            {isEditMode ? (
              <Box component="form">
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  onClick={handleProfileUpdate}
                  fullWidth
                >
                  Save Changes
                </Button>
              </Box>
            ) : (
              <Box textAlign="center">
                <Typography variant="h5">{profile.name}</Typography>
                <Typography color="textSecondary">{profile.title}</Typography>
                <Typography color="textSecondary">{profile.company}</Typography>
                <Typography color="textSecondary">{profile.email}</Typography>
                <Typography color="textSecondary">{profile.phone}</Typography>
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
            {profile.projects.map((project, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Snackbar Notifications */}
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
