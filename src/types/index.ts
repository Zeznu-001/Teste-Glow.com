import { LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  Icon: LucideIcon;
  price: string;
  features: string[];
  duration?: number;
}

export interface BookingState {
  isOpen: boolean;
  selectedService?: Service;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  icon?: LucideIcon;
}

export interface BookingFormData {
  service: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
}