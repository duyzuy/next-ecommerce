import { DispatchWithoutAction, useReducer } from 'react';
import StoreContext from '../contexts/StoreContext';

import rootReducer, {
  initialState,
  InitialRootStateType
} from '../reducer/rootReducer';
import { AppDispatchType } from '../contexts/StoreContext';
import { logger } from '../utils/logger';

const StoreProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [state, dispatch]: [InitialRootStateType, AppDispatchType] = useReducer(
    logger(rootReducer),
    initialState
  );

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
