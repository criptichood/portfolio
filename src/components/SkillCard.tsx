
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Skill {
  name: string;
  description: string;
}
interface SkillCardProps {
 skill: Skill;
 onDelete: (skill: Skill) => void;
}

function SkillCard({ skill, onDelete }: SkillCardProps) {
 return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {skill.name}
        </Typography>
      </CardContent>
      <IconButton
        aria-label="delete"
        onClick={() => onDelete(skill)}
        // style={{ position: 'absolute', top: 5, right: 5 }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}

export default SkillCard;
