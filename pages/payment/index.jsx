import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { isPayment } from '../../constants/booking';
import { Container, Header } from 'semantic-ui-react';
import Input from '../../components/Input';
import styles from '../../styles/payment.module.scss';
import Select from '../../components/Select';
// import { Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from '../../providers/hooks';
const PaymentPage = (props) => {
  const { cities } = props;

  const router = useRouter();
  //   const [cities, setCities] = useState([]);
  const setting = useSelector((state) => state.setting);
  const booking = useSelector((state) => state.booking);

  const countryAllows = setting.woocommerceSpecificAllowedCountries;
  const [formData, setFormData] = useState({
    user: {},
    shipping: {},
    payment: {}
  });

  const countries = useMemo(() => {
    return countryAllows?.value.reduce(
      (acc, key) => {
        acc = [...acc, { key, value: key, text: countryAllows.options[key] }];
        return acc;
      },
      [{ value: '', text: 'Chọn quốc gia' }]
    );
  }, [countryAllows]);

  const handleSelection = (type, data) => {
    setFormData((prevState) => ({
      ...prevState,
      user: {
        [type]: data
      }
    }));
  };
  //   useEffect(() => {
  //     (async () => {
  //       const cities = await fetch('https://provinces.open-api.vn/api', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }).then((response) => response.json());
  //     })();
  //   }, []);

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
                  <Input name="email" label="Email" placeholder="Email" />
                  <Input
                    name="phone"
                    label="Số điện thoại "
                    placeholder="Số điện thoại"
                  />
                  <Select
                    label="Quốc gia"
                    options={countries}
                    selected={formData?.user.country}
                    onSetSelected={(data) => handleSelection('country', data)}
                  />
                  <Select
                    label="Thành phố"
                    options={countries}
                    selected={formData?.user.city}
                    onSetSelected={(data) => handleSelection('city', data)}
                  />
                  {/* <Select
                    label="Quận huyện"
                    options={countries}
                    selected={formData?.user.city}
                    onSetSelected={(data) => handleSelection('district', data)}
                  /> */}
                  <Input name="address" label="Địa chỉ" placeholder="Địa chỉ" />
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
export async function getServerSideProps(ctx) {
  const response = await fetch('https://provinces.open-api.vn/api/?depth=2', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const cities = await response.json();
  return {
    props: {
      cities
      // session, profile, orders
    }
  };
}
// PaymentPage.booking = {
//   loading: 'loading...',
//   redirect: '/cart' // redirect to this url
// };
