import { ThemeProvider, createTheme } from '@mui/material';
import Weather from './components/Weather';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Weather App</h1>
        <Weather />
      </div>
    </ThemeProvider>
  );
}

export default App;
