import { useEffect, useCallback } from 'react';
import { AppContext } from '../contexts';
import { useDispatch } from './hooks';
import {
  FETCH_GENERAL_SETTING,
  FETCH_USER_DATA,
  FETCH_CATEGORY,
  FETCH_DEVICE_TYPE
} from '../constants/actions';
import { getSetting } from '../actions/setting';
import { useSession } from 'next-auth/react';
import { client } from '../api/client';
import { settingType } from '../constants/constants';
const AppProvider = ({ categories, children, device }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  console.log({ categories, children, device });
  const onDispatchSetting = useCallback(async () => {
    const generalSetting = await getSetting(settingType.GENERAL);

    dispatch({
      type: FETCH_GENERAL_SETTING,
      payload: {
        settingValue: generalSetting,
        settingType: settingType.GENERAL
      }
    });
    dispatch({
      type: FETCH_CATEGORY,
      payload: {
        ...categories
      }
    });
    dispatch({
      type: FETCH_DEVICE_TYPE,
      payload: {
        ...device
      }
    });
  }, []);

  const fetchUserData = async (session) => {
    const response = await client.get('/user', { email: session.user.email });
    dispatch({
      type: FETCH_USER_DATA,
      payload: { ...response.data }
    });
  };
  useEffect(() => {
    onDispatchSetting();
  }, []);

  useEffect(() => {
    if (session) {
      fetchUserData(session);
    }
  }, []);
  return (
    <AppContext.Provider value={{ isLoading: false }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
