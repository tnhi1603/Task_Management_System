import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FaHome,
  FaTasks,
  FaClipboardList,
  FaProjectDiagram,
  FaBell,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#1976d2", // Màu nền của AppBar
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  margin: "0 8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", icon: <FaHome size={20} />, path: "/" },
    { text: "Tasks", icon: <FaTasks size={20} />, path: "/tasks" },
    { text: "Task Details", icon: <FaClipboardList size={20} />, path: "/task-details" },
    { text: "Projects", icon: <FaProjectDiagram size={20} />, path: "/projects" },
    { text: "Notifications", icon: (
        <Badge badgeContent={5} color="error">
          <FaBell size={20} />
        </Badge>
      ), path: "/notifications" },
    { text: "Profile", icon: <FaUser size={20} />, path: "/profile" },
  ];

  const drawer = (
    <Box sx={{ bgcolor: "background.paper", height: "100%" }}>
      <List>
        {navItems.map((item) => (
          <StyledLink to={item.path} key={item.text}>
            <ListItem
              button
              sx={{
                "&:hover": { backgroundColor: "#e3f2fd" },
                backgroundColor: location.pathname === item.path ? "#fff" : "transparent", // Màu nền trắng khi đang chọn
                color: location.pathname === item.path ? "#1976d2" : "inherit", // Màu chữ xanh khi đang chọn
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <FaBars />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Task Management System
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <StyledLink to={item.path} key={item.text}>
                  <NavButton
                    startIcon={item.icon}
                    aria-label={item.text}
                    sx={{
                      backgroundColor: location.pathname === item.path ? "#fff" : "transparent", // Màu nền trắng khi đang chọn
                      color: location.pathname === item.path ? "#1976d2" : "inherit", // Màu chữ xanh khi đang chọn
                    }}
                  >
                    {item.text}
                  </NavButton>
                </StyledLink>
              ))}
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
