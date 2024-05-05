import { Container, Typography, Card, CardContent, Avatar } from '@mui/material';
import profileImage from './images/drake.jpg'; // Import your profile image

function AboutMe() {
  return (
    <Container sx={{ marginX: 'auto', marginY: '3%' }}>
      <Card variant="outlined" sx={{ backgroundColor: '#f0f0f0' }}>
        <CardContent>
          <Avatar
            alt="Profile Image"
            src={profileImage}
            sx={{
              width: 150,
              height: 150,
              margin: 'auto',
              marginBottom: 2,
            }}
          />
          <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 2 }}>
            About Me
          </Typography>
          <Typography variant="body1" paragraph>
          Hello, I am Emmanuel, a graduate of Computer Science from
              the University of Science and Technology Aliero. Throughout my
              academic journey, I have acquired comprehensive theoretical
              knowledge in various key areas of computer science.

          </Typography>
          <Typography variant="body1" paragraph>
            Fusce congue, mauris a scelerisque vestibulum, velit leo convallis justo, ut convallis risus tortor sed nunc.
            Mauris aliquet, urna ut elementum suscipit, risus velit feugiat mi, at posuere libero purus in ex.
            Morbi vitae felis vitae velit molestie cursus. Vestibulum ultrices leo vel tellus malesuada ullamcorper.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AboutMe;
