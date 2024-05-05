import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Import social media icons

import unsplashImage from "./images/unsplash.jpg";
import AboutMe from "./AboutMe";
import SkillList from "./SkillList";
import ProjectList from "./ProjectList";
import Footer from "./Footer";

interface Project {
  name: string;
  description: string;
}

const Homepage: React.FC = () => {
  const dummyProjects: Project[] = [
    {
      name: "Project 1",
      description: "Description of Project 1",
    },
    {
      name: "Project 2",
      description: "Description of Project 2",
    },
    {
      name: "Project 3",
      description: "Description of Project 3",
    },
  ];

  return (
    <>
       <Container sx={{ marginX: 'auto', marginTop: '3%' }}>
        <Card variant="outlined" sx={{ backgroundColor: '#f0f0f0' }}>
          <CardContent>
            <Avatar
              alt="Unsplash Image"
              src={unsplashImage}
              sx={{ width: 200, height: 200, margin: 'auto', marginBottom: 2 }}
            />
            <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 2 }}>
              CripticHood
            </Typography>
        

            {/* Social media icons */}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <IconButton size="large" sx={{ margin: 1 }} color="primary">
                <Facebook />
              </IconButton>
              <IconButton size="large" sx={{ margin: 1 }} color="primary">
                <Twitter />
              </IconButton>
              <IconButton size="large" sx={{ margin: 1 }} color="primary">
                <Instagram />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </Container>

      <AboutMe />

      {/* Display ProjectList with dummy projects */}
      <Container sx={{ marginX: "auto", marginTop: "3%" }}>
        <ProjectList projects={dummyProjects} />
      </Container>

      <SkillList />
      <Footer />
    </>
  );
};

export default Homepage;
