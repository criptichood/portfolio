import SkillForm from './SkillForm';
import SkillDetail from './SkillDetail';
import SkillCard from './SkillCard';
import { useState } from 'react';
import { Container, Grid } from '@mui/material';


function AddSkills() {
interface Skill {
    name: string;
    description: string;
  }
  

 // State to manage list of skills
 const [skills, setSkills] = useState<Skill[]>([]);

 // Function to handle adding a new skill with details
 const handleAddSkill = (newSkill: Skill) => {
   setSkills([...skills, newSkill]);
 };

 // Function to handle deleting a skill
 const handleDeleteSkill = (skillToDelete: Skill) => {
   setSkills(skills.filter((skill) => skill !== skillToDelete));
 };



  return(
    <>
    <Container sx={{ marginX: 'auto', marginY: '3%' }}>
{/* Skill Form */}
<SkillForm onAddSkill={handleAddSkill} />

{/* Skill Cards */}
<Grid container spacing={2}>
  {skills.map((skill, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <SkillCard skill={skill} onDelete={handleDeleteSkill} />
    </Grid>
  ))}
</Grid>

{/* Skill Details */}
{skills.length > 0 && <SkillDetail skill={skills[0]} />} {/* Display first skill details */}
</Container>
    </>
  )  
} 
export default AddSkills;
