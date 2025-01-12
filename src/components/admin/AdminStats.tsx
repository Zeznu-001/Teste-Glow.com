import React from 'react';
import { Calendar, Users, DollarSign, Clock } from 'lucide-react';

const stats = [
  {
    label: "Today's Bookings",
    value: '12',
    icon: Calendar,
    color: 'bg-violet-100 text-violet-600'
  },
  {
    label: 'Total Customers',
    value: '248',
    icon: Users,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    label: 'Revenue',
    value: '$1,840',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    label: 'Avg. Service Time',
    value: '45m',
    icon: Clock,
    color: 'bg-blue-100 text-blue-600'
  }
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-medium">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}