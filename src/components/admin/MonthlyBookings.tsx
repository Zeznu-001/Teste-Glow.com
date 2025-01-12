import React from 'react';
import { Calendar } from 'lucide-react';

interface MonthlyBookingsProps {
  bookings: Record<string, number>;
}

export default function MonthlyBookings({ bookings }: MonthlyBookingsProps) {
  const maxBookings = Math.max(...Object.values(bookings));

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(bookings).map(([month, count]) => (
        <div key={month} className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{month}</span>
            <Calendar className="h-4 w-4 text-violet-600" />
          </div>
          <div className="relative pt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-2 left-0 h-2 bg-violet-600 rounded-full"
                style={{
                  width: `${(count / maxBookings) * 100}%`,
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
            <p className="mt-2 text-lg font-medium">{count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}