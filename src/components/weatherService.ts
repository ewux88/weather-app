import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    console.log('Fetching weather data for city:', city);
    console.log('Using API key:', API_KEY ? 'API key exists' : 'API key is missing');
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    console.log('Weather API response:', response.data);
    return response.data as WeatherData;
  } catch (error) {
    console.error('Error details:', {
      message: (error as Error).message,
      response: (error as any).response?.data,
      status: (error as any).response?.status
    });
    throw error;
  }
}; 