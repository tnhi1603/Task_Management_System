import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Button, Typography } from "@mui/material";

import axios from "axios";
import ProjectDialog from "./ProjectDialog";

const ProjectList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // call API: lấy danh sách dự án
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/project")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //

  const handleViewDetails = (project) => {
    setCurrentProject(project);
    setOpenDialog(true);
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setOpenDialog(true);
  };

  //

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddProject}>
        Thêm Dự Án Mới
      </Button>
      <Grid container spacing={2} mt={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleViewDetails(project)}
                  mt={2}
                >
                  Xem Chi Tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {openDialog && (
        <ProjectDialog
          project={currentProject}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      )}
    </div>
  );
};

export default ProjectList;
