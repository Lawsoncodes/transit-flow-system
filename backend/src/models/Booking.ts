export interface Booking {
  id: string;
  user_id: string;
  schedule_id: string;
  vehicle_id: string;
  seat_number?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_time: Date;
  payment_status: 'pending' | 'paid' | 'refunded';
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBookingRequest {
  schedule_id: string;
  vehicle_id: string;
  seat_number?: number;
}

export interface BookingResponse {
  id: string;
  user_id: string;
  schedule_id: string;
  vehicle_id: string;
  seat_number?: number;
  status: string;
  booking_time: Date;
  payment_status: string;
  total_amount: number;
  created_at: Date;
  schedule: {
    id: string;
    departure_time: Date;
    arrival_time: Date;
    origin_station: string;
    destination_station: string;
  };
  vehicle: {
    id: string;
    type: string;
    name: string;
  };
}
