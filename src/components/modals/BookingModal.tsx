import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Scissors } from 'lucide-react';
import { Service } from '../../types';
import { validateEmail, validatePhone, validateDate, validateTime } from '../../utils/validation';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import { BookingManager } from '../../services/bookingManager';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../auth/AuthModal';

const services = [
  { title: 'Hair Styling', price: '$45+', duration: 60 },
  { title: 'Hair Coloring', price: '$85+', duration: 120 },
  { title: 'Makeup Services', price: '$60+', duration: 60 },
  { title: 'Nail Care', price: '$35+', duration: 45 },
  { title: 'Facial Treatments', price: '$75+', duration: 60 },
  { title: 'Spa Packages', price: '$120+', duration: 120 },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service;
}

export default function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  const [showAuth, setShowAuth] = useState(false);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    service: selectedService?.title || '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setSubmitStatus('idle');
      setIsSubmitting(false);
      setErrors({});
      setFormData({
        service: selectedService?.title || '',
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        date: '',
        time: '',
        notes: ''
      });
    }
  }, [isOpen, selectedService, user]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (!validateDate(formData.date)) {
      newErrors.date = 'Please select a future date';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    } else if (!validateTime(formData.time)) {
      newErrors.time = 'Please select a time between 9 AM and 8 PM';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuth(true);
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const bookingManager = BookingManager.getInstance();
      await bookingManager.createBooking(formData);
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-light mb-6">Book Appointment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormSelect
              label="Service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              options={services}
              error={errors.service}
              icon={Scissors}
              required
            />

            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
              placeholder="Your full name"
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
              placeholder="your@email.com"
            />

            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
              required
              placeholder="+1 (555) 000-0000"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
                icon={Calendar}
                required
                min={today}
              />
              
              <FormInput
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                error={errors.time}
                icon={Clock}
                required
              />
            </div>

            <FormTextarea
              label="Additional Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or requirements..."
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : submitStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : submitStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-violet-600 hover:bg-violet-700'
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : submitStatus === 'success' ? (
                'Booking Confirmed!'
              ) : submitStatus === 'error' ? (
                'Error - Try Again'
              ) : !user ? (
                'Sign in to Book'
              ) : (
                'Confirm Booking'
              )}
            </button>
          </form>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        onSuccess={() => setShowAuth(false)}
      />
    </>
  );
}