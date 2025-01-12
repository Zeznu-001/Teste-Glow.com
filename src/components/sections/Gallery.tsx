import React from 'react';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Hair Styling",
    category: "Hair"
  },
  {
    url: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Makeup Session",
    category: "Makeup"
  },
  {
    url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Nail Art",
    category: "Nails"
  },
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Facial Treatment",
    category: "Skincare"
  },
  {
    url: "https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Bridal Makeup",
    category: "Bridal"
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Hair Coloring",
    category: "Hair"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">Our Gallery</h2>
          <div className="h-1 w-20 bg-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Showcasing our finest work and happy clients</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white text-sm uppercase tracking-wider">{image.category}</span>
                  <h3 className="text-white text-lg font-light">{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}