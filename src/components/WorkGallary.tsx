import React from 'react';
import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

interface WorkGalleryProps {
  images: string[]; // Array of image URLs
}

const WorkGallery: React.FC<WorkGalleryProps> = ({ images }) => {
  return (
    <Container maxWidth="lg">
      <ImageList cols={3} rowHeight={200}>
        {images.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img src={imageUrl} alt={`Work ${index + 1}`} />
            <ImageListItemBar
              title={`Work ${index + 1}`}
              position="top"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default WorkGallery;
