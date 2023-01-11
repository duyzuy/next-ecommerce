import { withBookingLayout } from '../../HOCs/withBookingLayout';
import styles from '../../styles/thank.module.scss';
const ThankyouPage = () => {
  return <div className="wrapper page thank">page</div>;
};

export default withBookingLayout(ThankyouPage, {
  title: 'Thank you',
  step: 'thankyou',
  styles: styles
});
