export interface Schedule {
  id: string;
  vehicle_id: string;
  origin_station_id: string;
  destination_station_id: string;
  departure_time: Date;
  arrival_time: Date;
  available_seats: number;
  total_seats: number;
  price: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface CreateScheduleRequest {
  vehicle_id: string;
  origin_station_id: string;
  destination_station_id: string;
  departure_time: string;
  arrival_time: string;
  total_seats: number;
  price: number;
}

export interface ScheduleResponse {
  id: string;
  vehicle_id: string;
  origin_station_id: string;
  destination_station_id: string;
  departure_time: Date;
  arrival_time: Date;
  available_seats: number;
  total_seats: number;
  price: number;
  status: string;
  created_at: Date;
  vehicle: {
    id: string;
    type: string;
    name: string;
    capacity: number;
  };
  origin_station: {
    id: string;
    name: string;
    location: string;
  };
  destination_station: {
    id: string;
    name: string;
    location: string;
  };
}
