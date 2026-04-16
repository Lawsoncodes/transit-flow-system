import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },
};

export const scheduleAPI = {
  getSchedules: async (params?: {
    origin?: string;
    destination?: string;
    date?: string;
  }) => {
    const response = await api.get('/api/schedules', { params });
    return response.data;
  },
};

export const bookingAPI = {
  createBooking: async (data: {
    schedule_id: string;
    vehicle_id: string;
    seat_number?: number;
  }) => {
    const response = await api.post('/api/bookings', data);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get('/api/bookings/my-bookings');
    return response.data;
  },
};

export const stationAPI = {
  getStations: async () => {
    const response = await api.get('/api/stations');
    return response.data;
  },
};

export const vehicleAPI = {
  getVehicles: async () => {
    const response = await api.get('/api/vehicles');
    return response.data;
  },
};

export default api;
