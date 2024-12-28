import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const ProjectDialog = ({ project, open, setOpen }) => {
  const [projectDetail, setProjectDetail] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    members: "",
    startDate: "",
    dueDate: "",
  });
  const [users, setUsers] = useState([]);

  // call API để lấy danh sách user
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // call API để lấy dự án theo id
  useEffect(() => {
    if (project && project._id) {
      axios
        .get(`http://localhost:5001/api/project/${project._id}`)
        .then((response) => setProjectDetail(response.data))
        .catch((error) => console.error("Error fetching project:", error));
    }
  }, [project]);

  // Cập nhật formData từ projectDetail( được lấy từ id))
  useEffect(() => {
    if (projectDetail) {
      // ánh xạ id của owner và members
      const ownerName =
        users.find((user) => user._id === projectDetail.owner?._id)?.name || "";
      const memberNames =
        projectDetail.members
          ?.map((member) => {
            const user = users.find((user) => user._id === member._id);
            return user ? user.name : "";
          })
          .join(", ") || "";
      // để hiển thị thông tin  của projectDetail khi mở ProjectDialog
      setFormData({
        name: projectDetail.name || "",
        description: projectDetail.description || "",
        owner: ownerName,
        members: memberNames,
        startDate: projectDetail.startDate
          ? new Date(projectDetail.startDate).toLocaleDateString("en-CA")
          : "",
        dueDate: projectDetail.dueDate
          ? new Date(projectDetail.dueDate).toLocaleDateString("en-CA")
          : "",
      });
    }
  }, [projectDetail, users]);

  // Đóng dialog
  const handleClose = () => setOpen(false);

  // Xử lý cập nhật và  thêm mới dự án
  const handleSubmit = async () => {
    try {
      const updatedFormData = {
        ...formData,
        owner: users.find((user) => user.name === formData.owner)?._id,
        members: formData.members
          ? formData.members
              .split(",")
              .map(
                (name) =>
                  users.find((user) => user.name.trim() === name.trim())?._id
              )
          : [],
      };

      if (project) {
        await axios.put(
          `http://localhost:5001/api/project/${project._id}`,
          updatedFormData,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Project updated successfully");
      } else {
        await axios.post("http://localhost:5001/api/project", updatedFormData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Project created successfully");
      }

      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
    }
  };

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{project ? "Cập Nhật Dự Án" : "Thêm Dự Án Mới"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên Dự Án"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Mô Tả"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Chủ Sở Hữu"
          variant="outlined"
          fullWidth
          margin="normal"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
        />
        <TextField
          label="Thành Viên"
          variant="outlined"
          fullWidth
          margin="normal"
          name="members"
          value={formData.members}
          onChange={handleChange}
        />
        <TextField
          label="Ngày Bắt Đầu"
          variant="outlined"
          fullWidth
          margin="normal"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        <TextField
          label="Ngày Hết Hạn"
          variant="outlined"
          fullWidth
          margin="normal"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
