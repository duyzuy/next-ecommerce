import { useEffect, useCallback } from 'react';
import { AppContext } from '../contexts';
import { useDispatch } from './hooks';
import { LOAD_ECOM_SETTING, FETCH_USER_DATA } from '../constants/actions';
import { loadSetting } from '../actions/setting';
import { useSession } from 'next-auth/react';
import { client } from '../api/client';
import { settingType } from '../constants/constants';
const AppProvider = (props) => {
  const disPatch = useDispatch();
  const { data: session, status } = useSession();

  const onDispatchSetting = useCallback(async () => {
    const generalSetting = await loadSetting(settingType.GENERAL);

    disPatch({
      type: LOAD_ECOM_SETTING,
      payload: {
        settingValue: generalSetting,
        settingType: settingType.GENERAL
      }
    });
  }, []);

  const fetchUserData = async (session) => {
    const response = await client.get('/user', { email: session.user.email });

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
