import { useContext } from 'react';
import StoreContext, { ActionType } from '../contexts/StoreContext';

import { InitialRootStateType, ReducerKeys } from '../reducer/rootReducer';

export const combineReducers =
  (slices: Record<ReducerKeys, Function>) =>
  (state: InitialRootStateType, action: ActionType) => {
    const initialState: Partial<InitialRootStateType> = {};
    return Object.keys(slices).reduce((acc, current) => {
      return {
        ...acc,
        [current]: slices[current as keyof typeof slices](
          state[current],
          action
        )
      };
    }, initialState);
  };

export const useSelector = (cb: (state: InitialRootStateType) => void) => {
  const [state, _] = useContext(StoreContext);

  if (cb !== undefined && typeof cb === 'function') {
    const data = cb(state);
    return data;
  }

  return state;
};

export const useDispatch = () => {
  const [_, dispatch] = useContext(StoreContext);

  return dispatch;
};
