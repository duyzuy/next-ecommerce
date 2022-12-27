import { useEffect, useState } from 'react';
import { useSelector } from '../providers/hooks';
const useBooking = ({ onCanNotBooking }) => {
  const [isPayment, setIsPayment] = useState(false);
  const productCount = useSelector((state) => state.booking.products.count);
  useEffect(() => {
    if (productCount === 0) {
      setIsPayment(false);
      if (onCanNotBooking) {
        onCanNotBooking();
      }
    } else {
      setIsPayment(true);
    }
  }, [productCount]);

  return isPayment;
};
export default useBooking;
