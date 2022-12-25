import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { isPayment } from '../../constants/booking';
import { Container, Header } from 'semantic-ui-react';
import Input from '../../components/Input';
import styles from '../../styles/payment.module.scss';
import Select from '../../components/Select';
import { useSelector, useDispatch } from '../../providers/hooks';
const PaymentPage = () => {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const setting = useSelector((state) => state.setting);
  const countryAllows = setting.woocommerceSpecificAllowedCountries;
  const [paymentInfor, setPaymentInfor] = useState({
    user: {},
    shipping: {},
    payment: {}
  });
  // const [countries, setCountries] = useState(() => {
  //   return countryAllows?.value.reduce(
  //     (acc, key) => {
  //       acc.push({
  //         value: key,
  //         text: countryAllows.options[key]
  //       });
  //       return acc;
  //     },
  //     [{ value: '', text: 'Chọn quốc gia' }]
  //   );
  // });

  const countries = useMemo(() => {
    return countryAllows?.value.reduce(
      (acc, key) => {
        acc.push({
          value: key,
          text: countryAllows.options[key]
        });
        return acc;
      },
      [{ value: '', text: 'Chọn quốc gia' }]
    );
  }, [countryAllows]);

  const handleSelection = (data) => {
    setPaymentInfor((prevState) => ({
      ...prevState,
      user: {
        city: data
      }
    }));
  };
  // useEffect(() => {
  //   (async () => {
  //     const cities = await fetch('https://provinces.open-api.vn/api');
  //   })();
  // }, []);

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className="page-header">
          <Header
            size="large"
            textAlign="center"
            style={{ marginBottom: '30px' }}
          >
            Thanh toán
          </Header>
        </div>
        <div className="page-body">
          <div className="col-left">
            <div className="col-inner">
              <div className="section-header">
                <h4>Thông tin thanh toán</h4>
              </div>
              <div className="form">
                <form>
                  <Input name="firstName" label="Họ" placeholder="Họ" />
                  <Input
                    name="lastName"
                    label="Tên đệm và tên"
                    placeholder="Tên đệm và tên"
                  />
                  <Select
                    label="Quốc gia"
                    options={countries}
                    selected={paymentInfor?.user.city}
                    onSetSelected={handleSelection}
                  />

                  <Input
                    name="address"
                    label="Địa chỉ"
                    placeholder="Tên đệm và tên"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-right"></div>
        </div>
      </div>
    </Container>
  );
};
export default PaymentPage;
// export async function getServerSideProps(ctx) {
//   const session = await getSession({ req: ctx.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/user/login',
//         permanent: false
//       }
//     };
//   }

//   const profile = await getCustomerByEmail(session.user.email);

//   const orders = await getOrders({
//     customer: profile.id
//   });

//   return {
//     props: { session, profile, orders }
//   };
// }
PaymentPage.booking = {
  loading: 'loading...',
  redirect: '/cart' // redirect to this url
};
