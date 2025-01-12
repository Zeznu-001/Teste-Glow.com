import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const team = [
  {
    name: "Sarah Johnson",
    role: "Master Stylist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Emily Chen",
    role: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Maria Garcia",
    role: "Nail Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">Meet Our Team</h2>
          <div className="h-1 w-20 bg-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Expert professionals dedicated to your beauty</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center space-x-4">
                    <a href={member.social.instagram} className="text-white hover:text-violet-400 transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href={member.social.twitter} className="text-white hover:text-violet-400 transition-colors">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href={member.social.linkedin} className="text-white hover:text-violet-400 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}