import React, { DispatchWithoutAction } from 'react';
import { createContext } from 'react';
import { InitialRootStateType, initialState } from '../reducer/rootReducer';
export interface AppActionType {
  type: string;
  payload: any;
}
export type AppDispatchType = React.Dispatch<AppActionType>;
const StoreContext = createContext<[InitialRootStateType, AppDispatchType]>([
  initialState,
  null
]);

export default StoreContext;
