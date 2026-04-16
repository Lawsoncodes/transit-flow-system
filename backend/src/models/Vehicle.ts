export interface Vehicle {
  id: string;
  provider_id: string;
  type: 'bus' | 'train' | 'taxi' | 'shuttle';
  name: string;
  license_plate?: string;
  capacity: number;
  current_location?: string;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: Date;
  updated_at: Date;
}

export interface CreateVehicleRequest {
  provider_id: string;
  type: 'bus' | 'train' | 'taxi' | 'shuttle';
  name: string;
  license_plate?: string;
  capacity: number;
}

export interface VehicleResponse {
  id: string;
  provider_id: string;
  type: string;
  name: string;
  license_plate?: string;
  capacity: number;
  current_location?: string;
  status: string;
  created_at: Date;
  available_seats: number;
}
