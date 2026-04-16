export interface Station {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  current_occupancy: number;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: Date;
  updated_at: Date;
}

export interface CreateStationRequest {
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
}

export interface StationResponse {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  current_occupancy: number;
  congestion_level: 'low' | 'medium' | 'high';
  status: string;
  created_at: Date;
}
