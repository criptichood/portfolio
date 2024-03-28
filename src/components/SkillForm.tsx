import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

interface SkillFormProps {
  onAddSkill: (newSkill: Skill) => void; // Expecting a function that takes a Skill object as input
}

interface Skill {
  name: string;
  description: string;
}

const SkillForm: React.FC<SkillFormProps> = ({ onAddSkill }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onAddSkill({ name, description }); // Passing the name and description as a Skill object
    setName('');
    setDescription('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Skill
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Skill Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Skill Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Skill
        </Button>
      </form>
    </Container>
  );
}

export default SkillForm;
