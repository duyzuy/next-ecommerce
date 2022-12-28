import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { isPayment } from '../../constants/booking';
import { Container, Header, TextArea } from 'semantic-ui-react';
import Input from '../../components/Input';
import styles from '../../styles/payment.module.scss';
import Select from '../../components/Select';
// import { Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from '../../providers/hooks';
import { withBookingLayout } from '../../HOCs/withBookingLayout';
import BookingSummary from '../../components/BookingSummary';
const PaymentPage = (props) => {
  const { cities } = props;

  const router = useRouter();
  //   const [cities, setCities] = useState([]);
  const setting = useSelector((state) => state.setting);
  const bookingInfor = useSelector((state) => state.booking);
  const currency = useSelector(
    (state) => state.setting.woocommerceCurrency?.value
  );

  const countryAllows = setting.woocommerceSpecificAllowedCountries;
  const [formData, setFormData] = useState({
    user: {},
    shipping: {},
    billing: {}
  });
  const handleSelection = (type, data) => {
    setFormData((formData) => ({
      ...formData,
      user: {
        ...formData.user,
        [type]: data
      }
    }));
  };
  const countries = useMemo(() => {
    return countryAllows?.value.reduce(
      (acc, key) => {
        return [...acc, { key, value: key, text: countryAllows.options[key] }];
      },
      [{ value: '', text: 'Chọn quốc gia' }]
    );
  }, [countryAllows]);

  const citiesOpt = useMemo(() => {
    let arrCities = [];
    cities.forEach((item, index) => {
      let districts = [];
      item.districts.forEach((subItem, subIndex) => {
        districts[subIndex] = {
          code: subItem.code,
          codeName: subItem.codename,
          provinceCode: subItem.province_code,
          divisionType: subItem.division_type,
          value: subItem.codename,
          text: subItem.name,
          wards: subItem.wards
        };
      });

      arrCities[index] = {
        code: item.code,
        codeName: item.codename,
        phoneCode: item.phone_code,
        divisionType: item.division_type,
        value: item.codename,
        text: item.name,
        districts: districts
      };
    });

    return arrCities;
  }, [cities]);

  const districtsOpts = useMemo(() => {
    const city = formData.user.city || {};
    let districts = [];
    const citySelected = cities.find((item) => item.code === city.code);

    if (citySelected) {
      districts = citySelected.districts.map((item, index) => ({
        code: item.code,
        codeName: item.codename,
        provinceCode: item.province_code,
        divisionType: item.division_type,
        value: item.codename,
        text: item.name,
        wards: item.wards
      }));
    }
    return districts;
  }, [formData.user.city, formData.user.country]);

  return (
    <>
      <div className="col-left">
        <div className="col-inner">
          <div className="section-header">
            <h4>Thông tin thanh toán</h4>
          </div>
          <div className="payment-form">
            <form>
              <div className="billing__form">
                <div className="form-row">
                  <Input name="firstName" label="Họ" placeholder="Họ" />
                  <Input
                    name="lastName"
                    label="Tên đệm và tên"
                    placeholder="Tên đệm và tên"
                  />
                </div>
                <div className="form-row">
                  <Input name="email" label="Email" placeholder="Email" />
                  <Input
                    name="phone"
                    label="Số điện thoại "
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="form-row">
                  <Select
                    label="Quốc gia"
                    options={countries}
                    selected={formData?.user.country}
                    onSetSelected={(data) => handleSelection('country', data)}
                  />
                  <Select
                    label="Tỉnh/thành phố"
                    options={citiesOpt}
                    selected={formData?.user.city}
                    onSetSelected={(data) => handleSelection('city', data)}
                  />
                </div>
                <Select
                  label="Quận/huyện"
                  options={districtsOpts}
                  selected={formData?.user.district}
                  onSetSelected={(data) => handleSelection('district', data)}
                />
                <Input name="address" label="Địa chỉ" placeholder="Địa chỉ" />
              </div>
              <div className="shipping__form">
                <div className="shipping__form--header">
                  <div className="ec__form--control checkbox">
                    <input type="checkbox" />
                    Giao hàng tới địa chỉ khác ?
                  </div>
                </div>
                <div className="shipping__form--body">
                  <div className="form-row">
                    <Input name="firstName" label="Họ" placeholder="Họ" />
                    <Input
                      name="lastName"
                      label="Tên đệm và tên"
                      placeholder="Tên đệm và tên"
                    />
                  </div>
                  <div className="form-row">
                    <Input
                      name="phone"
                      label="Số điện thoại "
                      placeholder="Số điện thoại"
                    />
                  </div>
                  <div className="form-row">
                    <Select
                      label="Quốc gia"
                      options={countries}
                      selected={formData?.user.country}
                      onSetSelected={(data) => handleSelection('country', data)}
                    />
                    <Select
                      label="Tỉnh/thành phố"
                      options={citiesOpt}
                      selected={formData?.user.city}
                      onSetSelected={(data) => handleSelection('city', data)}
                    />
                  </div>
                  <div className="form-row">
                    <Select
                      label="Quận/huyện"
                      options={districtsOpts}
                      selected={formData?.user.district}
                      onSetSelected={(data) =>
                        handleSelection('district', data)
                      }
                    />
                    <Input
                      name="postcode"
                      label="Mã bưu điện"
                      placeholder="Mã bưu điện"
                    />
                  </div>
                  <Input name="address" label="Địa chỉ" placeholder="Địa chỉ" />
                </div>
              </div>
              <div className="note">
                <div className="ec__form--control">
                  <label>Ghi chú đơn hàng</label>
                  <textarea
                    className="ec__form--input textarea"
                    rows={8}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-right">
        <div className="booking-summary">
          <div className="section-header">
            <h4>Thông tin đơn hàng</h4>
          </div>
          <BookingSummary
            bookingInfor={bookingInfor}
            currency={currency}
            router={router}
            step="payment"
          />
        </div>
      </div>
    </>
  );
};
PaymentPage.booking = {
  loading: 'loading...',
  redirect: '/cart'
};

export default withBookingLayout(PaymentPage, {
  title: 'Thanh toán',
  step: 'payment',
  styles: styles
});
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
    }
  };
}
