import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
}

interface Project {
  name: string;
  description: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Project
        </Button>
      </form>
    </Container>
  );
}

export default ProjectForm;
