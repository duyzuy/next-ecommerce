import { useContext } from 'react';
import StoreContext, { ActionType } from '../contexts/StoreContext';
import { DeviceType } from '../model';
import { BookingDataType } from '../reducer/booking';

import {
  InitialRootStateType,
  initialState,
  ReducerKeys
} from '../reducer/rootReducer';

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

interface CallbackType {}
export const useSelector = <R>(
  selector: (state: InitialRootStateType) => R
) => {
  const [state, _] = useContext(StoreContext);

  return selector(state);
};

export const useDispatch = () => {
  const [_, dispatch] = useContext(StoreContext);

  return dispatch;
};

// const makeSelector =
//   <I, R>(selectingFunction: (state: I) => R) =>
//   (state: I) =>
//     selectingFunction(state);

// const bookingInfor = makeSelector((state: InitialRootStateType) => state.booking);

// const out = bookingInfor(initialState);

export const createReducer = (initialState, builder) => {};
