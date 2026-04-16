export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  provider_id: string;
  type: 'bus' | 'train' | 'taxi' | 'shuttle';
  name: string;
  license_plate?: string;
  capacity: number;
  current_location?: string;
  status: string;
  created_at: string;
  available_seats?: number;
}

export interface Schedule {
  id: string;
  vehicle_id: string;
  origin_station_id: string;
  destination_station_id: string;
  departure_time: string;
  arrival_time: string;
  available_seats: number;
  total_seats: number;
  price: number;
  status: string;
  created_at: string;
  vehicle?: {
    id: string;
    type: string;
    name: string;
    capacity: number;
  };
  origin_station?: {
    id: string;
    name: string;
    location: string;
  };
  destination_station?: {
    id: string;
    name: string;
    location: string;
  };
}

export interface Booking {
  id: string;
  user_id: string;
  schedule_id: string;
  vehicle_id: string;
  seat_number?: number;
  status: string;
  booking_time: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  schedule?: {
    id: string;
    departure_time: string;
    arrival_time: string;
    origin_station: string;
    destination_station: string;
  };
  vehicle?: {
    id: string;
    type: string;
    name: string;
  };
}

export interface Station {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  current_occupancy: number;
  congestion_level: 'low' | 'medium' | 'high';
  status: string;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}
