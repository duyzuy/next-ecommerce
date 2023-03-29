import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

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
  ADD_SHIPPING_METHOD,
  FETCH_ORDER_DETAIL
} from '../../constants/actions';
import { shippingMethodType } from '../../constants/constants';
import { getFeeFromShortCode } from '../../utils/helper';
import CustomLoader from '../../components/CustomLoader';
import { client } from '../../api/client';
import { bookingSchema } from '../../utils/validate';
import { PageBooking } from '../../constants/common';
import styles from '../../styles/payment.module.scss';
const PaymentPage = (props) => {
  const { cities } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const generalSetting = useSelector((state) => state.setting.general);
  const shippingZones = useSelector((state) => state.setting.wcShippingZones);
  const bookingInfor = useSelector((state) => state.booking);
  const [errors, setErrors] = useState([]);
  const currency = useSelector((state) => {
    return (
      state.setting.general?.woocommerceCurrency.value ||
      state.setting.general?.woocommerceCurrency.default
    );
  });

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
      (bookingInfor.isDifferenceShipping && bookingInfor.shipping) ||
      bookingInfor.billing;

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
          total: flatFee.toString()
        };
        break;
      }
      case shippingMethodType.LOCAL_PICKUP: {
        const localFee = Number(settings.cost.value);
        shippingLine = {
          ...shippingLine,
          total: localFee.toString()
        };
        break;
      }
      case shippingMethodType.FREE_SHIPPING: {
        let freFee = 0;
        shippingLine = {
          ...shippingLine,
          total: freFee.toString()
        };
        break;
      }
    }
    dispatch({
      type: ADD_SHIPPING_METHOD,
      payload: {
        ...shippingLine
      }
    });
  };

  const onSubmitOrder = useCallback(async () => {
    console.log({ bookingInfor });
    const {
      billing,
      shipping,
      paymentMethod,
      shippingMethod,
      isDifferenceShipping,
      products,
      coupons,
      isAcceptTerm
    } = bookingInfor;

    //collect format data to validate before create order
    let dataSubmit = {
      paymentMethodId: paymentMethod.id,
      paymentMethodTitle: paymentMethod.title,
      setPaid: false,
      isDifferenceShipping: isDifferenceShipping,
      billing: {
        ...billing,
        country: billing.country.value,
        city: billing.city.value === '' ? null : billing.city.text,
        state: billing.district?.text || ''
      },
      shipping: {
        ...billing,
        country: billing.country.value,
        city: billing.city.value === '' ? null : billing.city.text,
        state: billing.district?.text || ''
      },
      lineItems: [...products.items],
      shippingLines: [{ ...shippingMethod }],
      couponLines: [...coupons],
      isAcceptTerm: isAcceptTerm
    };

    if (isDifferenceShipping) {
      dataSubmit = {
        ...dataSubmit,
        shipping: {
          ...shipping,
          country: shipping.country.value,
          city: shipping.city.value === '' ? null : shipping.city.text,
          state: shipping.district?.text || ''
        }
      };
    }
    console.log({ dataSubmit });
    bookingSchema
      .validate(
        {
          ...dataSubmit
        },
        { abortEarly: false }
      )
      .then(async (data) => {
        const lineItems = data.lineItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        }));
        const shippingLines = data.shippingLines.map((item) => ({
          method_id: item.method_id,
          method_title: item.method_title,
          total: item.total
        }));
        const couponLines = data.couponLines.map((coupon) => ({
          code: coupon.code
        }));
        const orderResponse = await client.post(`order/create`, {
          payment_method: data.paymentMethodId,
          payment_method_title: data.paymentMethodTitle,
          set_paid: false,
          billing: {
            first_name: data.billing.firstName,
            last_name: data.billing.lastName,
            address_1: data.billing.address,
            address_2: data.billing.address,
            city: data.billing.city,
            state: data.billing.state,
            postcode: data.billing.postCode,
            country: data.billing.country,
            email: data.billing.email,
            phone: data.billing.phone
          },
          shipping: {
            first_name: data.shipping.firstName,
            last_name: data.shipping.lastName,
            address_1: data.shipping.address,
            address_2: data.shipping.address,
            city: data.shipping.city,
            state: data.shipping.state,
            postcode: data.shipping.postCode,
            country: data.shipping.country
          },
          line_items: [...lineItems],
          shipping_lines: [...shippingLines],
          coupon_lines: [...couponLines],
          customer_note: bookingInfor.orderNote,
          customer_id: 0, //default guest
          customer_user_agent: '',
          customer_ip_address: ''
        });
        if (orderResponse.status === 'oke') {
          dispatch({
            type: FETCH_ORDER_DETAIL,
            payload: { ...orderResponse.data }
          });
        }
      })
      .catch((err) => {
        let errorMessage = {};
        console.log(err);
        err?.inner.forEach((err) => {
          const errKeys = err.path.split('.');
          if (errKeys.length > 1) {
            errorMessage = {
              ...errorMessage,
              [errKeys[0]]: {
                ...errorMessage[errKeys[0]],
                [errKeys[1]]: err.message
              }
            };
          } else {
            errorMessage = {
              ...errorMessage,
              [errKeys[0]]: err.message
            };
          }
        });
        setErrors(errorMessage);
        console.log({ errorMessage });
      });

    // if (!bookingInfor.isAcceptTerm) {
    //   toast({
    //     type: 'error',
    //     message: 'Vui long chap nhan dieu kien dieu khoan'
    //   });
    //   return;
    // }

    // const orderResponse = await client.post(`order/create`, { ...data });
    // return orderResponse;
  }, [bookingInfor]);

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
                data={bookingInfor?.billing}
                onChange={handleChange}
                countries={countries}
                cities={cities}
                errors={errors?.billing}
              />
              <div className="shipping__form">
                <div className="shipping__form--header">
                  <div
                    className={
                      (bookingInfor.isDifferenceShipping &&
                        'form__check checked') ||
                      'form__check'
                    }
                    onClick={() =>
                      handleChange(
                        'isDifferenceShipping',
                        !bookingInfor.isDifferenceShipping
                      )
                    }
                  >
                    <span className="icon"></span>
                    <p>Giao hàng tới địa chỉ khác ?</p>
                  </div>
                </div>
                {(bookingInfor.isDifferenceShipping && (
                  <PaymentShippingForm
                    formKey="shipping"
                    data={bookingInfor?.shipping}
                    onChange={handleChange}
                    countries={countries}
                    cities={cities}
                    errors={errors?.shipping}
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
                            bookingInfor?.shippingMethod?.id === method.id
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
                  {(errors.shippingLines && (
                    <p className="error-message">{errors.shippingLines}</p>
                  )) || <></>}
                </div>
              </div>
              <div className="note">
                <TextArea
                  noResize
                  label="Ghi chú"
                  placeholder="Lưu ý khi giao hàng..."
                  value={bookingInfor?.orderNote}
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
            errors={errors}
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
  page: PageBooking.Payment,
  styles: styles
});
export async function getServerSideProps(ctx) {
  console.log({ ctx });
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
