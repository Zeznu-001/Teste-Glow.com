import { useState } from 'react';
import { BookingState, Service } from '../types';

export const useBooking = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    isOpen: false,
    selectedService: undefined,
  });

  const openBooking = (service?: Service) => {
    setBookingState({
      isOpen: true,
      selectedService: service,
    });
  };

  const closeBooking = () => {
    setBookingState({
      isOpen: false,
      selectedService: undefined,
    });
  };

  return {
    bookingState,
    openBooking,
    closeBooking,
  };
};