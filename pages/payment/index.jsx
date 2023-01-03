import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/payment.module.scss';

import { useSelector, useDispatch } from '../../providers/hooks';
import { withBookingLayout } from '../../HOCs/withBookingLayout';
import BookingSummary from '../../components/BookingSummary';
import TextArea from '../../components/TextArea';
import PaymentBillingForm from '../../components/PaymentBillingForm';
import PaymentShippingForm from '../../components/PaymentShippingForm';
import {
  getShipping,
  getShippingLocationsByZoneId,
  getPaymentGateway,
  getShippingMethodsByZoneId,
  getShippingZone
} from '../../actions/setting';

import {
  UPDATE_PAYMENT_INFOR,
  FETCH_SHIPPING_SETTING,
  FETCH_PAYMENT_GATEWAY_SETTING,
  FETCH_SHIPPING_ZONE_SETTING,
  ADD_SHIPPING_LINES
} from '../../constants/actions';
import { shippingMethodType } from '../../constants/constants';
import { getFeeFromShortCode } from '../../utils/helper';
const PaymentPage = (props) => {
  const { cities } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const [isDifferenceShipping, setIsDifferenceShipping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const generalSetting = useSelector((state) => state.setting.general);
  const shippingZones = useSelector((state) => state.setting.wcShippingZones);
  const bookingInfor = useSelector((state) => state.booking);
  const currency = useSelector((state) => {
    return (
      state.setting.general?.woocommerceCurrency.value ||
      state.setting.general?.woocommerceCurrency.default
    );
  });
  const shippingZoneByUserAddress = useMemo(() => {
    const orderInfor = bookingInfor.order;
    const userAddShipping =
      (orderInfor.isDifferenceShipping && orderInfor.shipping) ||
      orderInfor.billing;

    // shippingZones?.forEach((zone) => {

    // });
  }, [bookingInfor.order, shippingZones]);

  const {
    woocommerceShipToCountries,
    woocommerceSpecificShipToCountries,
    woocommerceSpecificAllowedCountries
  } = generalSetting || {};

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
    return woocommerceSpecificAllowedCountries?.value.reduce(
      (acc, key) => {
        return [
          ...acc,
          {
            key,
            value: key,
            text: woocommerceSpecificAllowedCountries.options[key]
          }
        ];
      },
      [{ ...countryDefault }]
    );
  }, [woocommerceSpecificAllowedCountries]);

  const fetchShippingZone = async () => {
    setIsLoadingShipping(true);
    try {
      const shippingZone = await getShippingZone().then((response) =>
        Promise.all(
          response.map(async (zone) => {
            const shippingLocations = await getShippingLocationsByZoneId(
              zone.id
            );
            let shippingMethods = await getShippingMethodsByZoneId(zone.id, {
              enabled: true
            });
            shippingMethods = shippingMethods.filter(
              (method) => method.enabled
            );
            return {
              ...zone,
              locations: shippingLocations,
              methods: shippingMethods
            };
          })
        )
      );

      dispatch({
        type: FETCH_SHIPPING_ZONE_SETTING,
        payload: shippingZone
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingShipping(false);
    }
  };

  const onGetPaymentSetting = useCallback(async () => {
    try {
      setIsLoading(true);
      const shipping = await getShipping();
      const payment = await getPaymentGateway();

      dispatch({
        type: FETCH_SHIPPING_SETTING,
        payload: shipping
      });

      dispatch({
        type: FETCH_PAYMENT_GATEWAY_SETTING,
        payload: payment
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const shippingZonesFilter = useMemo(() => {
    const userShippingInfor =
      (bookingInfor.order.isDifferenceShipping &&
        bookingInfor.order.shipping) ||
      bookingInfor.order.billing;

    console.log(userShippingInfor);
    let shippingMethods = [];
    const isExistsPostCode = (arr) => {
      return arr.some((el) => el.type === 'postcode');
    };
    const isValidUserAddress = ({ code, countries: [] }) => {
      console.log({ code, countries });
      return countries.some((el) => el.key === code);
    };

    shippingZones?.forEach((zone) => {
      if (isExistsPostCode(zone.locations)) {
        if (
          isValidUserAddress({
            code: userShippingInfor.postCode,
            countries: zone.locations
          }) &&
          isValidUserAddress({
            code: userShippingInfor.country.key,
            countries: zone.locations
          })
        ) {
          console.log('postcode');
          shippingMethods = [{ ...zone }];
        }
      } else {
        if (
          isValidUserAddress({
            code: userShippingInfor?.country?.key,
            countries: zone.locations
          })
        ) {
          console.log('city');
          shippingMethods = [{ ...zone }];
        }
      }
    });
    return shippingMethods;
  }, [shippingZones, bookingInfor]);

  const onSelectShippingMethod = (method) => {
    const { settings } = method;
    const totalPrice = bookingInfor.total;
    console.log(method);
    let shippingLines = { ...method };
    switch (method.method_id) {
      case shippingMethodType.FLAT_RATE: {
        const costStr = method.settings.cost.value;

        let minFee = 0;
        let maxFee = 0;
        let percent = 0;
        if (costStr.includes('max_fee')) {
          maxFee = getFeeFromShortCode({ str: costStr, key: 'max_fee' });
        }
        if (costStr.includes('min_fee')) {
          minFee = getFeeFromShortCode({ str: costStr, key: 'min_fee' });
        }
        if (costStr.includes('percent')) {
          percent = getFeeFromShortCode({ str: costStr, key: 'percent' });
        }
        let feeAddition = (percent * Number(totalPrice)) / 100;
        if (feeAddition > maxFee) {
          feeAddition = maxFee;
        }
        if (feeAddition < minFee) {
          feeAddition = minFee;
        }
        shippingLines = {
          ...shippingLines,
          totalFee: feeAddition
        };
        break;
      }
      case shippingMethodType.LOCAL_PICKUP: {
        break;
      }
      case shippingMethodType.FREE_SHIPPING: {
        shippingLines = {
          ...shippingLines,
          totalFee: 0
        };
        break;
      }
    }

    console.log({ shippingLines });
    // dispatch({ type: ADD_SHIPPING_LINES, payload: { ...method } });
  };
  useEffect(() => {
    onGetPaymentSetting();
    fetchShippingZone();
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
              <PaymentBillingForm
                formKey="billing"
                data={bookingInfor?.order?.billing}
                onChange={handleChange}
                countries={countries}
                cities={cities}
              />
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
                  <PaymentShippingForm
                    formKey="shipping"
                    data={bookingInfor?.order?.shipping}
                    onChange={handleChange}
                    countries={countries}
                    cities={cities}
                  />
                )) || <></>}
              </div>

              <div className="shipping__selections">
                <div className="section-header">
                  <h4>Hình thức giao hàng</h4>
                </div>
                <div className="section-body">
                  {shippingZonesFilter?.map((zone) => (
                    <div className="shipping__zone" key={zone.name}>
                      <div className="shipping__zone--title">
                        <h5>{zone.name}</h5>
                      </div>
                      <div className="shipping__zone--methods">
                        {zone.methods.map((method) => (
                          <div className="shipping__method" key={method.id}>
                            <div
                              className="shipping__method--wrapper"
                              onClick={() => onSelectShippingMethod(method)}
                            >
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: method.title
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="note">
                <TextArea
                  noResize
                  label="Ghi chú"
                  placeholder="Lưu ý khi giao hàng..."
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
            page="payment"
            isLoading={isLoading}
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
