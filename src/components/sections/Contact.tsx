import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: "123 Beauty Lane, Fashion District, NY 10001"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567"
  },
  {
    icon: Mail,
    title: "Email",
    content: "appointments@glowsalon.com"
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM"
  }
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">Contact Us</h2>
          <div className="h-1 w-20 bg-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Get in touch with us for appointments and inquiries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-violet-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{info.title}</h3>
                    <p className="mt-1 text-gray-600">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Subject</label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Message</label>
              <textarea
                required
                rows={4}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}