import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

interface Skill {
    name: string;
    description: string;
  }
interface SkillDetailProps {
  skill: Skill;
}

const SkillDetail: React.FC<SkillDetailProps> = ({ skill }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Skill Details
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">{skill.name}</Typography>
        <Typography variant="body1">
          Skills Details Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis risus non mollis scelerisque.
          Nulla facilisi. Curabitur nec est et est facilisis ullamcorper vel vitae mi.
          Morbi rutrum, urna ut tincidunt vestibulum, risus mi imperdiet nunc, et dictum velit eros sit amet enim.
        </Typography>
      </Paper>
    </Container>
  );
}

export default SkillDetail;
