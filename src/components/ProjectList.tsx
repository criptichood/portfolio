import React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[ ];
}

interface Project {
  name: string;
  description: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <Grid container spacing={2}>
      {projects.map((project, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectList;
