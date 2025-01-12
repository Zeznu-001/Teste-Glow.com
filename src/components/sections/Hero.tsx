import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onBooking: () => void;
  onViewServices: () => void;
}

export default function Hero({ onBooking, onViewServices }: HeroProps) {
  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-pink-600/60 to-orange-500/50"></div>
      </div>
      
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-6 px-4 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-light text-white tracking-tight">
            Discover Your True
            <span className="block font-normal bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              Beauty
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Experience luxury beauty services tailored to enhance your natural radiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={onBooking}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-light tracking-wide hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Appointment
            </button>
            <button 
              onClick={onViewServices}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full text-lg font-light tracking-wide hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              View Services
            </button>
          </div>
        </div>
        
        <button 
          onClick={onViewServices}
          className="absolute bottom-8 animate-bounce"
        >
          <ChevronDown className="h-8 w-8 text-white/80" />
        </button>
      </div>
    </div>
  );
}