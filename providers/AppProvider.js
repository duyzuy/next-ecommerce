import { useEffect, useCallback } from 'react';
import { AppContext } from '../contexts';

import { useDispatch } from './hooks';
import {
  LOAD_CART,
  LOAD_ECOM_SETTING,
  LOAD_SHIPPING,
  LOADING_PAYMENT_GATEWAY
} from '../constants/actions';
import {
  loadSetting,
  loadShipping,
  loadPaymentGateway
} from '../actions/setting';

const AppProvider = (props) => {
  const disPatch = useDispatch();

  const onDispatchSetting = useCallback(async () => {
    const data = await loadSetting();

    disPatch({
      type: LOAD_ECOM_SETTING,
      payload: data
    });
  }, []);

  const onDispatchShipping = useCallback(async () => {
    const shipping = await loadShipping();
    const payment = await loadPaymentGateway();

    disPatch({
      type: LOAD_SHIPPING,
      payload: shipping
    });

    disPatch({
      type: LOADING_PAYMENT_GATEWAY,
      payload: payment
    });
  }, []);

  useEffect(() => {
    disPatch({ type: LOAD_CART });
    onDispatchSetting();
    onDispatchShipping();
  }, []);

  return (
    <AppContext.Provider value={{ isLoading: false }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
