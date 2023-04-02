import { useContext } from 'react';
import StoreContext, { AppActionType } from '../contexts/StoreContext';

import {
  InitialRootStateType,
  initialState,
  ReducerKeys
} from '../reducer/rootReducer';

export const combineReducers =
  (slices: Record<ReducerKeys, Function>) =>
  (state: InitialRootStateType, action: AppActionType) => {
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

export const useSelector = <T>(
  selector: (state: InitialRootStateType) => T
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

// interface Slice<N, S, R> {
//   name?: N;
//   initialState?: S;
//   reducer?: R;
// }
// type SliceCreatetorReturn<N, S, R> = {
//   name: N;
//   reducer: R;
//   initialState: S;
// };

// export const createSlide = <N, S, R>(
//   slice: Slice<N, S, R>
// ): SliceCreatetorReturn<N, S, R> => {
//   let initialState = slice.initialState;

//   let methods: object = slice.reducer || {};

//   return {
//     name: slice.name,
//     reducer: { ...methods } as R,
//     initialState: slice.initialState
//   };
// };

// const userSlice = createSlide({
//   name: 'user',
//   initialState: { user: '', age: 20, address: '' },
//   reducer: {
//     increment: (state, action) => {},
//     decrement: (state, action) => {}
//   }
// });
// userSlice.name;
