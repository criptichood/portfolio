//  App.tsx
import { ThemeProvider } from '@mui/material/styles';
import themes from './components/themes'; 
import ResponsiveAppBar from './components/AppBar';
import Homepage from './components/HomePage';

function App() {
  
 return (
    <ThemeProvider theme={themes}>
      <ResponsiveAppBar />
      <Homepage />
      {/* Other components */}
    </ThemeProvider>
 );
}

export default App;
