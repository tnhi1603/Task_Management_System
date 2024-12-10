import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const commentsBefore = [
  {
    id: 1,
    taskId: 1, // ID của công việc liên quan
    userId: 101, // ID của người dùng đã comment
    text: "Mẫu thiết kế này rất tốt, nhưng cần thêm phần biểu đồ.",
    timestamp: "2024-12-05T08:30:00Z", // Thời gian comment
  },
  {
    id: 2,
    taskId: 1,
    userId: 102,
    text: "Đồng ý, cần bổ sung thêm màu sắc phù hợp.",
    timestamp: "2024-12-05T09:00:00Z",
  },
  {
    id: 3,
    taskId: 2,
    userId: 103,
    text: "API này có cần thêm chức năng phân trang không?",
    timestamp: "2024-12-06T10:15:00Z",
  },
  {
    id: 4,
    taskId: 3,
    userId: 104,
    text: "Họp nhóm đã đủ thông tin, có thể triển khai ngay.",
    timestamp: "2024-12-04T14:45:00Z",
  },
  {
    id: 5,
    taskId: 4,
    userId: 101,
    text: "Tìm kiếm hoạt động tốt, nhưng tốc độ vẫn chưa ổn định.",
    timestamp: "2024-12-06T16:20:00Z",
  },
  {
    id: 6,
    taskId: 5,
    userId: 102,
    text: "Cần làm rõ hơn từng bước trong hướng dẫn.",
    timestamp: "2024-12-07T11:00:00Z",
  },
  {
    id: 7,
    taskId: 6,
    userId: 103,
    text: "Unit test có tỷ lệ pass thấp, cần kiểm tra lại.",
    timestamp: "2024-12-08T09:30:00Z",
  },
  {
    id: 8,
    taskId: 7,
    userId: 104,
    text: "AWS đã được cấu hình, nhưng cần xác nhận quyền truy cập.",
    timestamp: "2024-12-09T12:15:00Z",
  },
  {
    id: 9,
    taskId: 8,
    userId: 101,
    text: "Hiệu năng đã cải thiện đáng kể sau khi tối ưu hóa.",
    timestamp: "2024-12-10T08:00:00Z",
  },
  {
    id: 10,
    taskId: 9,
    userId: 102,
    text: "Logo và favicon cần có kích thước phù hợp với mobile.",
    timestamp: "2024-12-05T17:45:00Z",
  },
  {
    id: 11,
    taskId: 10,
    userId: 103,
    text: "Thông báo hoạt động tốt trên email nhưng chưa hỗ trợ SMS.",
    timestamp: "2024-12-06T20:10:00Z",
  },
  {
    id: 12,
    taskId: 11,
    userId: 104,
    text: "Cần cải tiến UI, đặc biệt là trong phần hiển thị danh sách.",
    timestamp: "2024-12-07T07:50:00Z",
  },
  {
    id: 13,
    taskId: 12,
    userId: 101,
    text: "Phân quyền hoạt động đúng, nhưng thiếu chức năng báo cáo.",
    timestamp: "2024-12-08T09:20:00Z",
  },
  {
    id: 14,
    taskId: 13,
    userId: 102,
    text: "Buổi đào tạo cần tổ chức trực tuyến để thuận tiện hơn.",
    timestamp: "2024-12-10T15:30:00Z",
  },
  {
    id: 15,
    taskId: 14,
    userId: 103,
    text: "Báo cáo tiến độ cần bổ sung phần chú thích chi tiết.",
    timestamp: "2024-12-11T10:25:00Z",
  },
  {
    id: 16,
    taskId: 15,
    userId: 104,
    text: "Chức năng nhập xuất cần hỗ trợ định dạng JSON.",
    timestamp: "2024-12-12T14:10:00Z",
  },
  {
    id: 17,
    taskId: 16,
    userId: 101,
    text: "Giao diện chế độ tối trông rất ổn, nhưng cần kiểm tra thêm.",
    timestamp: "2024-12-13T08:30:00Z",
  },
  {
    id: 18,
    taskId: 17,
    userId: 102,
    text: "Hệ thống cần có kế hoạch bảo trì tự động.",
    timestamp: "2024-12-14T09:50:00Z",
  },
  {
    id: 19,
    taskId: 18,
    userId: 103,
    text: "Unit test chưa cover đủ các case quan trọng.",
    timestamp: "2024-12-15T11:45:00Z",
  },
  {
    id: 20,
    taskId: 19,
    userId: 104,
    text: "Index đã được thêm, tốc độ truy vấn cải thiện rõ rệt.",
    timestamp: "2024-12-16T13:30:00Z",
  },
];

const TaskDetailPage = () => {
  const [comment, setComment] = useState(""); // Bình luận mới
  const [comments, setComments] = useState(commentsBefore); // Danh sách bình luận

  const handleAddComment = () => {
    const newComment = {
      id: comments.length + 1,
      taskId: comments.length + 1,
      userId: comments.length + 1,
      text: comment,
      timestamp: new Date(task.dueDate).toLocaleString(),
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  const location = useLocation();
  const { task } = location.state || {}; // Trích xuất dữ liệu

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [status, setStatus] = useState(task?.status || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleEdit = () => {
    // setEditedTask(task); // Gán dữ liệu công việc vào trạng thái chỉnh sửa
    setOpenEditDialog(true); // Mở hộp thoại
  };

  const handleSaveEdit = () => {
    // console.log("Đã lưu chỉnh sửa:", editedTask);
    setOpenEditDialog(false); // Đóng hộp thoại
  };
  if (!task) return <Typography>Đang tải thông tin công việc...</Typography>;

  return (
    <Box padding={4}>
      <Paper elevation={3} padding={3} marginBottom={3}>
        <Typography variant="h4" marginBottom={2}>
          {task.title}
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          <strong>Mô tả:</strong> {task.description}
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          <strong>Mức độ ưu tiên:</strong> {task.priority}
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          <strong>Trạng thái:</strong> {task.status}
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          <strong>Thời hạn:</strong> {new Date(task.dueDate).toLocaleString()}
        </Typography>

        <Button variant="contained" color="primary" onClick={handleEdit}>
          Chỉnh sửa công việc
        </Button>
      </Paper>

      {/* Hộp thoại chỉnh sửa công việc */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
      >
        <DialogTitle>Chỉnh sửa công việc</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mức độ ưu tiên"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Thấp">Thấp</MenuItem>
            <MenuItem value="Trung bình">Trung bình</MenuItem>
            <MenuItem value="Cao">Cao</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Trạng thái"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Đang thực hiện">Đang thực hiện</MenuItem>
            <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
            <MenuItem value="Tạm dừng">Tạm dừng</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Thời hạn"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button
            // onClick={handleSaveEdit}
            variant="contained"
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      {/* Các công việc liên quan */}
      {task.relatedTasks?.length > 0 && (
        <Paper elevation={2} padding={2} marginBottom={3}>
          <Typography variant="h6" marginBottom={2}>
            Công việc liên quan:
          </Typography>
          <List>
            {task.relatedTasks.map((relatedTask) => (
              <ListItem key={relatedTask.id}>
                <ListItemText
                  primary={relatedTask.title}
                  secondary={`Thời hạn: ${new Date(
                    relatedTask.dueDate
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {/* Khu vực bình luận */}
      <Paper elevation={2} padding={2}>
        <Typography variant="h6" marginBottom={2}>
          Bình luận
        </Typography>
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={comment.text} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box display="flex" gap={2} marginTop={2}>
          <TextField
            fullWidth
            // sx={{ width: "2000px" }}
            label="Thêm bình luận"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            disabled={!comment.trim()}
          >
            Gửi
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskDetailPage;
