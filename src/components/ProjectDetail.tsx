import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

interface ProjectDetailsProps {
  project: Project;
}

interface Project {
  name: string;
  description: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Project Details
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body1">
          {project.description}
        </Typography>
      </Paper>
    </Container>
  );
}

export default ProjectDetails;
