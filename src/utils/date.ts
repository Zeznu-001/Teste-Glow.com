import { format } from 'date-fns';

export const formatFirestoreDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatDisplayTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return format(date, 'h:mm a');
};