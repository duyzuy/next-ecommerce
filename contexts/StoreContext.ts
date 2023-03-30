import React from 'react';
import { createContext } from 'react';
import { InitialRootStateType, initialState } from '../reducer/rootReducer';
export interface ActionType {
  type: string;
  payload: any;
}
export type DispatchType = React.Dispatch<ActionType>;
const StoreContext = createContext<[InitialRootStateType, DispatchType] | null>(
  null
);

export default StoreContext;
