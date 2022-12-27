import { useMemo } from 'react';
import { useSelector } from '../providers/hooks';
import { useRouter } from 'next/router';

const BookingRoute = ({ children }) => {
  const booking = useSelector((state) => state.booking);
  const router = useRouter();

  const canBooking = useMemo(() => {
    return booking.products.count === 0;
  }, [booking]);

  console.log(canBooking);
  if (canBooking) {
    router.push('/cart');
    return;
  }

  return children;
};
export default BookingRoute;
