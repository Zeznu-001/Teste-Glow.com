import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BookingManager } from '../../services/bookingManager';
import { Booking } from '../../types/booking';

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const today = new Date();
        const bookingManager = BookingManager.getInstance();
        const todayBookings = await bookingManager.getBookingsByDate(today);
        setBookings(todayBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-medium">Today's Bookings</h2>
      </div>
      <div className="divide-y">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{booking.name}</h3>
                <p className="text-sm text-gray-600">{booking.service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {format(new Date(`${booking.date}T${booking.time}`), 'h:mm a')}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No bookings for today
          </div>
        )}
      </div>
    </div>
  );
}