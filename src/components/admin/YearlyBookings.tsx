import React, { useState, useEffect } from 'react';
import { format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';
import { BookingManager } from '../../services/bookingManager';
import MonthlyBookings from './MonthlyBookings';

export default function YearlyBookings() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [monthlyBookings, setMonthlyBookings] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadYearlyBookings = async () => {
      try {
        setLoading(true);
        const year = new Date(selectedYear, 0, 1);
        const months = eachMonthOfInterval({
          start: startOfYear(year),
          end: endOfYear(year)
        });

        const bookingManager = BookingManager.getInstance();
        const bookingsCount: Record<string, number> = {};

        for (const month of months) {
          const bookings = await bookingManager.getBookingsByDate(month);
          const monthKey = format(month, 'MMM');
          bookingsCount[monthKey] = bookings.length;
        }

        setMonthlyBookings(bookingsCount);
      } catch (error) {
        console.error('Error loading yearly bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadYearlyBookings();
  }, [selectedYear]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Yearly Overview</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-600 focus:border-transparent"
        >
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <MonthlyBookings bookings={monthlyBookings} />
    </div>
  );
}