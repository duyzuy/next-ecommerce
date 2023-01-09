import { useEffect, useCallback } from 'react';
import { AppContext } from '../contexts';
import { useDispatch } from './hooks';
import { FETCH_GENERAL_SETTING, FETCH_USER_DATA } from '../constants/actions';
import { getSetting } from '../actions/setting';
import { useSession } from 'next-auth/react';
import { client } from '../api/client';
import { settingType } from '../constants/constants';
const AppProvider = (props) => {
  const disPatch = useDispatch();
  const { data: session, status } = useSession();

  const onDispatchSetting = useCallback(async () => {
    const generalSetting = await getSetting(settingType.GENERAL);

    disPatch({
      type: FETCH_GENERAL_SETTING,
      payload: {
        settingValue: generalSetting,
        settingType: settingType.GENERAL
      }
    });
  }, []);

  const fetchUserData = async (session) => {
    const response = await client.get('/user', { email: session.user.email });
    console.log({ navigator, history });

    // const navigator = window.navigator || null;
    // if (navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    //   });
    // } else {
    //   console.log('Geolocation is not supported by this browser.');
    // }
    disPatch({
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
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
