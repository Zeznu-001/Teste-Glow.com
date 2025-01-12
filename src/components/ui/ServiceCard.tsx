import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps extends Service {
  onBooking: () => void;
}

export default function ServiceCard({ 
  title, 
  description, 
  Icon, 
  price, 
  duration,
  features, 
  onBooking 
}: ServiceCardProps) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">{title}</h3>
        </div>
        <div className="text-right">
          <span className="text-purple-600 font-medium">{price}</span>
          {duration && (
            <p className="text-sm text-gray-500">{duration} min</p>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <ChevronRight className="h-4 w-4 text-pink-500" />
            {feature}
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onBooking}
        className="w-full bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 py-3 rounded-xl hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
      >
        Book Now
      </button>
    </div>
  );
}