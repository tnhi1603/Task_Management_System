import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

const BackgroundBox = styled(Box)({
  minHeight: "100vh",
  width: "100%",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AuthComponent = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !value
          ? "Email is required"
          : !emailRegex.test(value)
          ? "Invalid email format"
          : "";
        break;
      case "password":
        error = !value
          ? "Password is required"
          : value.length < 6
          ? "Password must be at least 6 characters"
          : "";
        break;
      case "confirmPassword":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      case "name":
        error = !value ? "Name is required" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      if (
        (!isLogin && key === "name") ||
        key === "email" ||
        key === "password" ||
        (!isLogin && key === "confirmPassword")
      ) {
        validateField(key, formData[key]);
        if (errors[key]) hasErrors = true;
      }
    });

    if (!hasErrors) {
      try {
        if (isLogin) {
          // Login API call
          const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email: formData.email,
              password: formData.password,
            }
          );
          setSnackbar({
            open: true,
            message: "Login successful!",
            severity: "success",
          });
          localStorage.setItem("token", response.data.token);
          // Chuyển hướng đến Dashboard sau khi login thành công
          setTimeout(() => {
            navigate("/");
          }, 2000)
        } else {
          // Register API call
          await axios.post("http://localhost:5000/api/auth/register", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          setSnackbar({
            open: true,
            message: "Registration successful! You can now login.",
            severity: "success",
          });
          setIsLogin(true); // Switch to login form after successful registration
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Authentication failed!",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      });
    }
  };

  return (
    <BackgroundBox>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, color: "#fff", fontWeight: "bold" }}
          >
            Task Management System
          </Typography>

          <StyledPaper>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              {isLogin ? "Login" : "Register"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                {!isLogin && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiUser />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiMail />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiLock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {!isLogin && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiLock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogin ? "Login" : "Register"}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{ textTransform: "none" }}
                  >
                    {isLogin
                      ? "Don't have an account? Register"
                      : "Already have an account? Login"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Box>
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
    </BackgroundBox>
  );
};

export default AuthComponent;
