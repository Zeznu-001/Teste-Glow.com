import React from 'react';
import { Scissors, Sparkles, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-pink-500" />
            <span className="ml-2 text-2xl font-serif text-gray-800">Elegance</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-pink-500">Services</a>
            <a href="#gallery" className="text-gray-600 hover:text-pink-500">Gallery</a>
            <a href="#team" className="text-gray-600 hover:text-pink-500">Our Team</a>
            <a href="#contact" className="text-gray-600 hover:text-pink-500">Contact</a>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-pink-500 mr-2" />
            <span className="text-gray-600">+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </nav>
  );
}