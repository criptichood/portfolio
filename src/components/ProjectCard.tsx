import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface ProjectCardProps {
  project: Project;
}

interface Project {
  name: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {project.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
