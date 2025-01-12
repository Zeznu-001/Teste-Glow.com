import React, { useState } from 'react';
import { X } from 'lucide-react';
import FormTextarea from '../forms/FormTextarea';
import { BookingManager } from '../../services/bookingManager';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export default function CancellationModal({ isOpen, onClose, bookingId }: CancellationModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const bookingManager = BookingManager.getInstance();
      await bookingManager.cancelBooking(bookingId, reason);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-light mb-6">Cancel Appointment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormTextarea
            label="Cancellation Reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Please provide a reason for cancellation..."
            rows={4}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
          </button>
        </form>
      </div>
    </div>
  );
}