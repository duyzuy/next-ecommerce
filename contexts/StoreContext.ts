import { createContext } from 'react';
import { InitialRootStateType, initialState } from '../reducer/rootReducer';

const StoreContext = createContext<InitialRootStateType>(initialState);

export default StoreContext;
