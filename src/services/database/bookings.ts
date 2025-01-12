import { 
  collection, 
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BookingFormData, Booking } from '../../types/booking';
import { formatFirestoreDate } from '../../utils/date';

const BOOKINGS_COLLECTION = 'bookings';

export const createBooking = async (data: BookingFormData): Promise<string> => {
  try {
    const bookingData = {
      ...data,
      createdAt: Timestamp.now(),
      status: 'pending'
    };
    
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), bookingData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
};

export const getBookingsByYear = async (year: number): Promise<Booking[]> => {
  try {
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year, 11, 31); // December 31st

    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('date', '>=', formatFirestoreDate(startDate)),
      where('date', '<=', formatFirestoreDate(endDate)),
      orderBy('date', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  } catch (error) {
    console.error('Error fetching yearly bookings:', error);
    throw new Error('Failed to fetch yearly bookings');
  }
};

export const getBookingsByDate = async (date: Date): Promise<Booking[]> => {
  try {
    const formattedDate = formatFirestoreDate(date);
    
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('date', '==', formattedDate),
      orderBy('time', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
};

export const updateBooking = async (id: string, data: Partial<Booking>): Promise<void> => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating booking:', error);
    throw new Error('Failed to update booking');
  }
};