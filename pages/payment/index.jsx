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
  ADD_SHIPPING_LINES,
  ADD_SHIPPING_METHOD,
  UPDATE_SHIPPING_ADDRESS
} from '../../constants/actions';
import { shippingMethodType } from '../../constants/constants';
import { getFeeFromShortCode } from '../../utils/helper';
import CustomLoader from '../../components/CustomLoader';
import { client } from '../../api/client';
import { toast } from '../../lib/toast';
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
  const [formData, setFormData] = useState({});
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
      type: UPDATE_SHIPPING_ADDRESS,
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

  const shippingMethodsFilter = useMemo(() => {
    const userShippingInfor =
      (bookingInfor.order.isDifferenceShipping &&
        bookingInfor.order.shipping) ||
      bookingInfor.order.billing;

    let zonesShipping = {};
    const isExistsPostCode = (arr) => {
      return arr.some((el) => el.type === 'postcode');
    };
    const isValidUserAddress = ({ code, countryList }) => {
      return countryList.some((el) => el.code === code);
    };

    shippingZones?.forEach((zone) => {
      if (isExistsPostCode(zone.locations)) {
        if (
          isValidUserAddress({
            code: userShippingInfor.postCode,
            countryList: zone.locations
          }) &&
          isValidUserAddress({
            code: userShippingInfor.country.key,
            countryList: zone.locations
          })
        ) {
          zonesShipping = { ...zone };
          return;
        }
      } else {
        if (
          isValidUserAddress({
            code: userShippingInfor?.country?.key,
            countryList: zone.locations
          })
        ) {
          zonesShipping = { ...zone };
          return;
        }
      }
    });
    let { methods } = zonesShipping;
    const totalPrice = bookingInfor.total;

    methods?.forEach((method) => {
      const { settings } = method;
      switch (method.method_id) {
        case shippingMethodType.FLAT_RATE: {
          break;
        }
        case shippingMethodType.LOCAL_PICKUP: {
          break;
        }
        case shippingMethodType.FREE_SHIPPING: {
          if (Number(settings.min_amount.value) > totalPrice) {
            const indexOfMethod = methods.findIndex(
              (item) => item.id === method.id
            );
            methods.splice(indexOfMethod, 1);
          }
          break;
        }
      }
    });
    return methods;
  }, [shippingZones, bookingInfor]);

  const onSelectShippingMethod = (method) => {
    const totalPrice = bookingInfor.total;
    const { settings } = method;
    let shippingLine = { ...method };
    switch (method.method_id) {
      case shippingMethodType.FLAT_RATE: {
        const costStr = settings.cost.value;

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
        let flatFee = (percent * Number(totalPrice)) / 100;
        if (flatFee > maxFee) {
          flatFee = maxFee;
        }
        if (flatFee < minFee) {
          flatFee = minFee;
        }
        shippingLine = {
          ...shippingLine,
          total: flatFee
        };
        break;
      }
      case shippingMethodType.LOCAL_PICKUP: {
        const localFee = Number(settings.cost.value);
        shippingLine = {
          ...shippingLine,
          total: localFee
        };
        break;
      }
      case shippingMethodType.FREE_SHIPPING: {
        let freFee = 0;
        shippingLine = {
          ...shippingLine,
          total: freFee
        };
        break;
      }
    }
    console.log(method);
    dispatch({ type: ADD_SHIPPING_METHOD, payload: { ...shippingLine } });
  };

  const onSubmitOrder = async () => {
    //handle validate data before create;
    console.log({ bookingInfor });
    if (!bookingInfor.isAcceptTerm) {
      toast({
        type: 'error',
        message: 'Vui long chap nhan dieu kien dieu khoan'
      });
      return;
    }

    if (
      !bookingInfor.order.billing.firstName ||
      bookingInfor.order.billing.firstName === '' ||
      !bookingInfor.order.billing.lastName ||
      bookingInfor.order.billing.lastName === ''
    ) {
      toast({
        type: 'error',
        message: 'Vui long nhap day du ho va ten'
      });
      return;
    }

    if (
      !bookingInfor.order.billing.email ||
      bookingInfor.order.billing.email === ''
    ) {
      toast({
        type: 'error',
        message: 'Vui long nhap email'
      });
      return;
    }
    if (
      !bookingInfor.order.billing.phone ||
      bookingInfor.order.billing.phone === ''
    ) {
      toast({
        type: 'error',
        message: 'Vui long nhap so dien thoai'
      });
      return;
    }

    if (bookingInfor.order.isDifferenceShipping) {
      if (
        !bookingInfor.order.shipping.firstName ||
        bookingInfor.order.shipping.firstName === '' ||
        !bookingInfor.order.shipping.lastName ||
        bookingInfor.order.shipping.lastName === ''
      ) {
        toast({
          type: 'error',
          message: 'Vui long nhap day du ho va ten'
        });
        return;
      }
    }

    // const orderResponse = await client.post(`order/create`, { ...data });
    // return orderResponse;
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
                  <div className="shipping__zone--methods">
                    {(isLoadingShipping && (
                      <CustomLoader inline="centered" size="small" />
                    )) ||
                      shippingMethodsFilter?.map((method) => (
                        <div
                          className={`shipping__method ${
                            bookingInfor?.order?.method?.id === method.id
                              ? 'active'
                              : ''
                          }`}
                          key={method.id}
                        >
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
            onSubmitOrder={onSubmitOrder}
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
