import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  price: string;
}

export default function ServiceCard({ title, description, Icon, price }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4">
        <Icon className="h-6 w-6 text-pink-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-pink-500 font-semibold">Starting at {price}</p>
    </div>
  );
}