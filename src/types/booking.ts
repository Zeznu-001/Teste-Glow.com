import { Service } from './index';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'rescheduled';

export interface Booking {
  id: string;
  service: Service;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
  status: BookingStatus;
  originalBooking?: string; // Reference to original booking ID if rescheduled
  cancellationReason?: string;
}

export interface BookingUpdate {
  date?: string;
  time?: string;
  status?: BookingStatus;
  cancellationReason?: string;
}