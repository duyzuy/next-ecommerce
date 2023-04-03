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
  selector: (initialState: InitialRootStateType) => T
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

// interface ItemType {
//   id?: number;
//   name?: string;
//   parentId?: number;
//   child?: ItemType[];
// }
// const arr: ItemType[] = [
//   { id: 1, name: 'a', parentId: 0, child: [] },
//   { id: 2, name: 'ab', parentId: 0, child: [] },
//   { id: 3, name: 'ac', parentId: 0, child: [] },
//   { id: 4, name: 'aa', parentId: 1, child: [] },
//   { id: 5, name: 'aaa', parentId: 4, child: [] },
//   { id: 6, name: 'adf', parentId: 2, child: [] },
//   { id: 7, name: 'agsd', parentId: 5, child: [] },
//   { id: 8, name: 'aasdfcv', parentId: 5, child: [] },
//   { id: 9, name: 'a123', parentId: 8, child: [] },
//   { id: 10, name: 'aasdfv', parentId: 2, child: [] },
//   { id: 11, name: 'avbcza', parentId: 2, child: [] },
//   { id: 12, name: 'affdsafd', parentId: 6, child: [] },
//   { id: 13, name: 'affdsafd', parentId: 9, child: [] },
//    { id: 14, name: 'affdsafd', parentId: 0, child: [] }
// ];

// let parrentEl = arr.filter((item) => item.parentId === 0);

// function loop(id: number, arr: ItemType[]) {
//   let childEl: Partial<ItemType>[] = [];
//   arr.forEach((item) => {
//     if (item.parentId === id) {

//       const childOfChild = loop(item.id, arr);

//        childEl = [...childEl, { ...item, child: childOfChild }];
//     }
//   });
//   return childEl;
// }
// parrentEl.forEach((item, index) => {
//   const childEl = loop(item.id, arr);
//   parrentEl[index].child = [...childEl];
// });

// console.log(parrentEl);
