// import React from "react";
// import { Fab } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

// const AddTaskButton = () => {
//   const handleAddTask = () => {
//     console.log("Mở form tạo công việc mới");
//   };

//   return (
//     <Fab
//       color="primary"
//       aria-label="add"
//       sx={{ position: "fixed", bottom: 16, right: 16 }}
//       onClick={handleAddTask}
//     >
//       <AddIcon />
//     </Fab>
//   );
// };

// export default AddTaskButton;

import React, { useState } from "react";
import { Fab, Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const AddTaskButton = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false); // Quản lý trạng thái Modal
  const [task, setTask] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Gửi dữ liệu đến Backend
      const response = await axios.post("/api/tasks", task);
      console.log("Công việc mới:", response.data);

      // Gọi callback để cập nhật danh sách công việc
      if (onTaskAdded) {
        onTaskAdded(response.data);
      }

      // Đóng modal và reset form
      setTask({ title: "", dueDate: "", priority: "Medium" });
      handleClose();
    } catch (error) {
      console.error("Lỗi khi thêm công việc:", error);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal Thêm Công Việc */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Tên Công Việc"
            name="title"
            fullWidth
            value={task.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Hạn Chót"
            name="dueDate"
            type="date"
            fullWidth
            value={task.dueDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Mức Độ Ưu Tiên"
            name="priority"
            select
            fullWidth
            value={task.priority}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="High">Cao</MenuItem>
            <MenuItem value="Medium">Trung Bình</MenuItem>
            <MenuItem value="Low">Thấp</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Thêm Công Việc
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskButton;
