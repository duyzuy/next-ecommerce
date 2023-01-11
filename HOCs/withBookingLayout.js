import { Container, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import BookingSteps from '../components/BookingSteps';
const withBookingLayout = (Component, { title, step, styles }) => {
  const STEPS = [
    {
      step: 1,
      name: 'Chọn sản phẩm',
      key: 'selecting',
      icon: () => <Icon.Pocket size={18} />
    },
    {
      step: 2,
      name: 'Giỏ hàng',
      key: 'cart',
      icon: () => <Icon.ShoppingCart size={18} />
    },
    {
      step: 3,
      name: 'Thanh toán',
      key: 'payment',
      icon: () => <Icon.CreditCard size={18} />
    },
    {
      step: 4,
      name: 'Hoàn thành',
      key: 'thankyou',
      icon: () => <Icon.Smile size={18} />
    }
  ];

  return (props) => {
    <Container>
      <div className={styles.wrapper}>
        <div className="page-header">
          <Header
            size="large"
            textAlign="center"
            style={{ marginBottom: '30px' }}
          >
            {title}
          </Header>
          <BookingSteps active={['selecting']} current={step} steps={STEPS} />
        </div>
        <div className="page-body">
          <Component {...props} />
        </div>
      </div>
    </Container>;
  };
};

export { withBookingLayout };
