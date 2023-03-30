import { useContext } from 'react';
import StoreContext from '../contexts/StoreContext';

import { InitialRootStateType, ReducerKeys } from '../reducer/rootReducer';

export const combineReducers =
  (slices: Record<ReducerKeys, Function>) =>
  (state: InitialRootStateType, action: any) => {
    console.log([slices]);
    return Object.keys(slices).reduce((acc, current) => {
      return {
        ...acc,
        [current]: slices[current as keyof typeof slices](
          state[current],
          action
        )
      };
    }, {});
  };

export const useSelector = (cb: (data: InitialRootStateType) => void) => {
  const [state, _] = useContext(StoreContext);

  if (cb !== undefined && typeof cb === 'function') {
    return cb(state);
  }

  return state;
};

export const useDispatch = () => {
  const [_, dispatch] = useContext(StoreContext);

  return dispatch;
};
