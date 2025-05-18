import { useState, useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import { getWeather } from './weatherService';
import type { WeatherData } from './weatherService';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          disabled={loading || !city}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {weather && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {weather.name}
            </Typography>
            <Typography variant="h3" component="div">
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography color="textSecondary">
              Feels like: {Math.round(weather.main.feels_like)}°C
            </Typography>
            <Typography variant="body1">
              {weather.weather[0].description}
            </Typography>
            <Typography variant="body2">
              Humidity: {weather.main.humidity}%
            </Typography>
            {weather.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
} 