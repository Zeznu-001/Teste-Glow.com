import { BookingFormData, Booking } from '../types/booking';
import { createBooking, getBookingsByDate, getBookingsByYear, updateBooking } from './database/bookings';
import { sendEmail } from './email';

export class BookingManager {
  private static instance: BookingManager;

  private constructor() {}

  static getInstance(): BookingManager {
    if (!BookingManager.instance) {
      BookingManager.instance = new BookingManager();
    }
    return BookingManager.instance;
  }

  async createBooking(data: BookingFormData): Promise<string> {
    try {
      const bookingId = await createBooking(data);
      await this.notifyCustomer(data.email, 'confirmation', data);
      return bookingId;
    } catch (error) {
      console.error('Error in createBooking:', error);
      throw error;
    }
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    return getBookingsByDate(date);
  }

  async getBookingsByYear(year: number): Promise<Booking[]> {
    return getBookingsByYear(year);
  }

  private async notifyCustomer(
    email: string,
    type: 'confirmation' | 'cancellation',
    booking: Partial<Booking>
  ): Promise<void> {
    const templates = {
      confirmation: {
        subject: 'Booking Confirmation',
        message: `Your appointment has been confirmed for ${booking.date} at ${booking.time}`
      },
      cancellation: {
        subject: 'Booking Cancelled',
        message: `Your appointment for ${booking.date} at ${booking.time} has been cancelled`
      }
    };

    const template = templates[type];
    await sendEmail(email, template.subject, template.message);
  }
}