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
import { useSession } from 'next-auth/react';
import { client } from '../api/client';
const AppProvider = (props) => {
  const disPatch = useDispatch();
  const { data: session, status } = useSession();

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

  const fetchUserInfor = async () => {
    const response = await fetch('/user', { email: session.user.email }).then(
      (data) => data
    );
    console.log(response);
  };
  useEffect(() => {
    disPatch({ type: LOAD_CART });
    onDispatchSetting();
    onDispatchShipping();
  }, []);

  useEffect(() => {
    if (session) {
      fetchUserInfor();
    }
  }, []);
  return (
    <AppContext.Provider value={{ isLoading: false }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
