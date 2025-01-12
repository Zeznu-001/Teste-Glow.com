import { BookingFormData, Booking } from '../types/booking';

// In-memory storage
class Storage {
  private static instance: Storage;
  private bookings: Booking[] = [];

  private constructor() {
    // Initialize with some sample data
    const today = new Date();
    this.bookings = [
      {
        id: '1',
        service: 'Hair Styling',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        date: today.toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmed',
        notes: 'First time customer'
      },
      {
        id: '2',
        service: 'Makeup',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '123-456-7891',
        date: today.toISOString().split('T')[0],
        time: '14:00',
        status: 'pending',
        notes: ''
      }
    ];
  }

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  createBooking(data: BookingFormData): string {
    const id = Math.random().toString(36).substr(2, 9);
    const booking: Booking = {
      id,
      ...data,
      status: 'pending'
    };
    this.bookings.push(booking);
    return id;
  }

  getBookingsByDate(date: Date): Booking[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.bookings.filter(booking => booking.date === dateStr);
  }

  getBooking(id: string): Booking | null {
    return this.bookings.find(booking => booking.id === id) || null;
  }

  updateBooking(id: string, update: Partial<Booking>): void {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...update };
    }
  }
}

export default Storage;