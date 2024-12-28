import React, { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Chuyển hướng đến /login nếu chưa đăng nhập
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    if (!userId) {
      console.error("User ID is undefined. Cannot fetch user profile.");
      setSnackbar({
        open: true,
        message: "User ID is missing. Please log in again.",
        severity: "error",
      });
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/${userId}`
        );
        const userData = response.data;
        setProfile({
          name: userData.name,
          title: userData.title || " ",
          email: userData.email,
          phone: userData.phone || " ",
          location: userData.location || " ",
          avatar: userData.avatar || "",
          company: userData.company || " ",
          projects: userData.projects || [],
        });
      } catch (error) {
        // console.error("Error fetching user profile:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch user profile. Please try again later.",
          severity: "error",
        });
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      // await axios.put(`http://localhost:5000/api/user/${userId}/update`, profile);
      await axios.put(
        `http://localhost:5001/api/user/${userId}/update`,
        profile
      );
      setIsEditMode(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      // console.error("Error updating profile:", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again later.",
        severity: "error",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      // await axios.put(`http://localhost:5000/api/user/${userId}/changepassword`, {
      await axios.put(
        `http://localhost:5001/api/user/${userId}/changepassword`,
        {
          oldPassword,
          newPassword,
        }
      );
      setIsPasswordDialogOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSnackbar({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });
    } catch (error) {
      // console.error("Error updating password:", error);
      setSnackbar({
        open: true,
        message: "Failed to update password. Please try again later.",
        severity: "error",
      });
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.put(
          `http://localhost:5001/api/user/${userId}/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfile({ ...profile, avatar: response.data.avatar });
        setSnackbar({
          open: true,
          message: "Profile picture updated successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error updating avatar:", error);
        setSnackbar({
          open: true,
          message: "Failed to update avatar. Please try again later.",
          severity: "error",
        });
      }
    }
  };
  const handleLocalUpload = () => {
    fileInputRef.current.click();
    setIsImageDialogOpen(false);
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    navigate("/login", { replace: true }); // Chuyển hướng đến trang đăng nhập
    setSnackbar({
      open: true,
      message: "You have successfully logged out.",
      severity: "success",
    });
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
                  src={`${profile.avatar}?t=${new Date().getTime()}`}
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
              <Box component="form">
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
                    setProfile({ ...profile, title: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Company"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile({ ...profile, company: e.target.value })
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
                    setProfile({ ...profile, location: e.target.value })
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
                <Button
                  variant="outlined"
                  fullWidth
                  color="error"
                  onClick={handleLogout}
                  sx={{ mt: 2 }}
                >
                  Log Out
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
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="normal"
          />
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
