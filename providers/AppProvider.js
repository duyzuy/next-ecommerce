import { useEffect, useState } from 'react';
import { AppContext } from '../contexts';
import { client } from '../api/client';
import { wooSetting } from '../constants/settings';
import { useDispatch } from './hooks';
import { LOAD_CART } from '../constants/actions';

const AppProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState();

  const disPatch = useDispatch();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await client
        .get('setting/general', {
          type: wooSetting.WOO_CURRENCY
        })
        .then((response) => {
          setCurrency(response.data);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    })();

    disPatch({ type: LOAD_CART });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currency,
        isLoading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
