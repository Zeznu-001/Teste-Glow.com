import React from 'react';
import { Scissors, Palette, Sparkles, Flower, Star, Gem } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import { Service } from '../../types';

interface ServicesProps {
  onBooking: (service: Service) => void;
}

const services: Service[] = [
  {
    title: "Hair Styling",
    description: "Transform your look with cutting-edge styles and expert coloring techniques",
    Icon: Scissors,
    price: "$45+",
    duration: 60,
    features: [
      "Custom haircuts",
      "Professional styling",
      "Hair treatments",
      "Blowouts"
    ]
  },
  {
    title: "Hair Coloring",
    description: "Expert color services to enhance your natural beauty or create bold new looks",
    Icon: Palette,
    price: "$85+",
    duration: 120,
    features: [
      "Full color",
      "Highlights",
      "Balayage",
      "Color correction"
    ]
  },
  {
    title: "Makeup Services",
    description: "Professional makeup artistry for any occasion, from natural to glamorous",
    Icon: Sparkles,
    price: "$60+",
    duration: 60,
    features: [
      "Special events",
      "Bridal makeup",
      "Natural looks",
      "Makeup lessons"
    ]
  },
  {
    title: "Nail Care",
    description: "Luxurious nail treatments combining artistry with relaxation",
    Icon: Star,
    price: "$35+",
    duration: 45,
    features: [
      "Manicures",
      "Pedicures",
      "Nail art",
      "Gel polish"
    ]
  },
  {
    title: "Facial Treatments",
    description: "Rejuvenating facial treatments customized for your skin type",
    Icon: Flower,
    price: "$75+",
    duration: 60,
    features: [
      "Deep cleansing",
      "Anti-aging",
      "Hydrating",
      "Acne treatment"
    ]
  },
  {
    title: "Spa Packages",
    description: "Complete luxury spa experiences for ultimate relaxation",
    Icon: Gem,
    price: "$120+",
    duration: 120,
    features: [
      "Full body massage",
      "Facial treatment",
      "Body scrub",
      "Aromatherapy"
    ]
  }
];

export default function Services({ onBooking }: ServicesProps) {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Our Services</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience luxury beauty services tailored to enhance your natural beauty. 
            Each service is performed by our expert professionals using premium products.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              onBooking={() => onBooking(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}