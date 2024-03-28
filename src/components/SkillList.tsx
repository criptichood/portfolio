import { Container, Typography, Card, CardContent, ListItemText, Grid, Button } from '@mui/material';

function SkillList() {
  const skills = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redux",
    "Material-UI",
    "Bootstrap",
    // Add more skills as needed
  ];

  return (
    <Container sx={{ marginX: 'auto', marginY: '3%' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#f0f0f0' }}>
        <CardContent>
          <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Skills
          </Typography>
          <Grid container spacing={2}>
            {skills.map((skill, index) => (

    <Grid item key={index} xs={12} sm={6} md={4}>
                <Button variant="contained" color='success'><ListItemText primary={skill}  /></Button>
                
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SkillList;
