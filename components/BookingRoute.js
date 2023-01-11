import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import useBooking from '../hooks/useBooking';
const BookingRoute = ({ children }) => {
  const router = useRouter();
  const isPayment = useBooking({
    onCanNotBooking: () => {
      router.push('/cart');
    }
  });

  if (!isPayment) {
    return <div>loading</div>;
  }
  return children;
};
export default BookingRoute;
