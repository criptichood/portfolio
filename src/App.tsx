//  App.tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themes from './components/themes'; 
import ResponsiveAppBar from './components/AppBar';
// import Navbar from './components/Navbar';


function App() {
 return (
    <ThemeProvider theme={themes}>
      <ResponsiveAppBar />
      {/* Other components */}
    </ThemeProvider>
 );
}

export default App;
