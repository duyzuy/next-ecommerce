import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import Input from '../../components/Input';
import styles from '../../styles/payment.module.scss';
import Select from '../../components/Select';
// import { Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from '../../providers/hooks';
import { withBookingLayout } from '../../HOCs/withBookingLayout';
import BookingSummary from '../../components/BookingSummary';
import TextArea from '../../components/TextArea';
import { UPDATE_PAYMENT_INFOR } from '../../constants/actions';
const PaymentPage = (props) => {
  const { cities } = props;
  console.log({ cities });
  const router = useRouter();

  const setting = useSelector((state) => state.setting);
  const bookingInfor = useSelector((state) => state.booking);
  const [isDifferenceShipping, setIsDifferenceShipping] = useState(false);
  const dispatch = useDispatch();
  const currency = useSelector(
    (state) => state.setting.woocommerceCurrency?.value
  );

  const countryAllows = setting.woocommerceSpecificAllowedCountries;

  const handleChange = (key, value) => {
    dispatch({
      type: UPDATE_PAYMENT_INFOR,
      payload: {
        key,
        value
      }
    });
  };
  const onSelectDifferenceShipping = () => {
    setIsDifferenceShipping((prevState) => !prevState);
    dispatch({
      type: UPDATE_PAYMENT_INFOR,
      payload: {
        key: 'isDifferenceShipping',
        value: !isDifferenceShipping
      }
    });
  };
  const countryDefault = { value: '', key: '', text: 'Chọn quốc gia' };
  const countries = useMemo(() => {
    return countryAllows?.value.reduce(
      (acc, key) => {
        return [...acc, { key, value: key, text: countryAllows.options[key] }];
      },
      [{ ...countryDefault }]
    );
  }, [countryAllows]);
  const emptyData = { value: 'n/a', key: 'n/a', text: 'N/A' };
  const cityDefault = { value: '', key: '', text: 'Chọn thành phố' };
  const shippingCityOpts = useMemo(() => {
    let arrCities = [{ ...cityDefault }];
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

      arrCities.push({
        code: item.code,
        codeName: item.codename,
        phoneCode: item.phone_code,
        divisionType: item.division_type,
        value: item.codename,
        text: item.name,
        districts: districts
      });
    });

    if (
      !bookingInfor.order.shipping.country ||
      bookingInfor.order.shipping.country.key !== 'VN'
    ) {
      return [{ ...cityDefault }, { ...emptyData }];
    }
    return arrCities;
  }, [bookingInfor?.order?.shipping?.city]);

  const billingCityOpts = useMemo(() => {
    let arrCities = [{ ...cityDefault }];
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

      arrCities.push({
        code: item.code,
        codeName: item.codename,
        phoneCode: item.phone_code,
        divisionType: item.division_type,
        value: item.codename,
        text: item.name,
        districts: districts
      });
    });

    if (
      !bookingInfor.order.billing.country ||
      bookingInfor.order.billing.country.key !== 'VN'
    ) {
      return [{ ...cityDefault }, { ...emptyData }];
    }
    return arrCities;
  }, [bookingInfor?.order?.billing?.country]);

  console.log({ bookingInfor });
  const shippingDistrictOpt = useMemo(() => {
    return [];
  }, [bookingInfor?.order?.shipping?.city]);
  const billingDistrictOpt = useMemo(() => {
    return [];
  }, []);
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
                  <Input
                    name="firstName"
                    label="Họ"
                    placeholder="Họ"
                    value={bookingInfor?.order?.billing?.firstName}
                    onChange={(e) =>
                      handleChange('billing.firstName', e.target.value)
                    }
                  />
                  <Input
                    name="lastName"
                    label="Tên đệm và tên"
                    placeholder="Tên đệm và tên"
                    value={bookingInfor?.order?.billing?.lastName}
                    onChange={(e) =>
                      handleChange('billing.lastName', e.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <Input
                    name="email"
                    label="Email"
                    placeholder="Email"
                    value={bookingInfor?.order?.billing?.email}
                    onChange={(e) =>
                      handleChange('billing.email', e.target.value)
                    }
                  />
                  <Input
                    name="phone"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    value={bookingInfor?.order?.billing?.phone}
                    onChange={(e) =>
                      handleChange('billing.phone', e.target.value)
                    }
                  />
                </div>
                <div className="form-row">
                  <Select
                    label="Quốc gia"
                    options={countries}
                    defaultSelect={countryDefault}
                    selected={bookingInfor?.order?.billing?.country}
                    onSetSelected={(data) =>
                      handleChange('billing.country', data)
                    }
                  />
                  <Select
                    label="Tỉnh/thành phố"
                    options={billingCityOpts}
                    defaultSelect={cityDefault}
                    selected={bookingInfor?.order?.billing.city}
                    onSetSelected={(data) => handleChange('billing.city', data)}
                  />
                </div>
                <Select
                  label="Quận/huyện"
                  options={billingDistrictOpt}
                  selected={bookingInfor?.order?.billing.district}
                  onSetSelected={(data) =>
                    handleChange('billing.district', data)
                  }
                />
                <Input
                  name="address"
                  label="Địa chỉ"
                  placeholder="Địa chỉ"
                  value={bookingInfor?.order?.billing?.address}
                  onChange={(e) =>
                    handleChange('billing.address', e.target.value)
                  }
                />
              </div>
              <div className="shipping__form">
                <div className="shipping__form--header">
                  <div
                    className={
                      (isDifferenceShipping && 'form__check checked') ||
                      'form__check'
                    }
                    onClick={onSelectDifferenceShipping}
                  >
                    <span className="icon"></span>
                    <p>Giao hàng tới địa chỉ khác ?</p>
                  </div>
                </div>
                {(isDifferenceShipping && (
                  <div className="shipping__form--body">
                    <div className="form-row">
                      <Input
                        name="firstName"
                        label="Họ"
                        placeholder="Họ"
                        value={bookingInfor?.order?.shipping?.firstName}
                        onChange={(e) =>
                          handleChange('shipping.firstName', e.target.value)
                        }
                      />
                      <Input
                        name="lastName"
                        label="Tên đệm và tên"
                        placeholder="Tên đệm và tên"
                        value={bookingInfor?.order?.shipping?.lastName}
                        onChange={(e) =>
                          handleChange('shipping.lastName', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-row">
                      <Input
                        name="phone"
                        label="Số điện thoại "
                        placeholder="Số điện thoại"
                        value={bookingInfor?.order?.shipping?.phone}
                        onChange={(e) =>
                          handleChange('shipping.phone', e.target.value)
                        }
                      />
                    </div>
                    <div className="form-row">
                      <Select
                        label="Quốc gia"
                        options={countries}
                        defaultSelect={countryDefault}
                        selected={bookingInfor?.order?.shipping?.country}
                        onSetSelected={(data) =>
                          handleChange('shipping.country', data)
                        }
                      />
                      <Select
                        label="Tỉnh/thành phố"
                        options={shippingCityOpts}
                        defaultSelect={cityDefault}
                        selected={bookingInfor?.order?.shipping?.city}
                        onSetSelected={(data) =>
                          handleChange('shipping.city', data)
                        }
                      />
                    </div>
                    <div className="form-row">
                      <Select
                        label="Quận/huyện"
                        options={shippingDistrictOpt}
                        selected={bookingInfor?.order?.shipping?.district}
                        onSetSelected={(data) =>
                          handleChange('shipping.district', data)
                        }
                      />
                      <Input
                        name="postcode"
                        label="Mã bưu điện"
                        placeholder="Mã bưu điện"
                        value={bookingInfor?.order?.shipping?.postCode}
                        onChange={(e) =>
                          handleChange('shipping.postCode', e.target.value)
                        }
                      />
                    </div>
                    <Input
                      name="address"
                      label="Địa chỉ"
                      placeholder="Địa chỉ"
                      value={bookingInfor?.order?.shipping?.address}
                      onChange={(e) =>
                        handleChange('shipping.address', e.target.value)
                      }
                    />
                  </div>
                )) || <></>}
              </div>
              <div className="note">
                <TextArea
                  noResize
                  label="Ghi chú"
                  value={bookingInfor?.order?.orderNote}
                  rows={4}
                  onChange={(value) => handleChange('orderNote', value)}
                />
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
