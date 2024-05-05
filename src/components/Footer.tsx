import React from 'react';
import { Container, Typography, IconButton, Link } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px 0' }} >
      <Container maxWidth="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Social Icons */}
        <div>
          <IconButton component={Link} href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub">
            <GitHub />
          </IconButton>
          <IconButton component={Link} href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
            <LinkedIn />
          </IconButton>
          <IconButton component={Link} href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
            <Twitter />
          </IconButton>
        </div>
        
        {/* Copyright */}
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} CriptiHood. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
