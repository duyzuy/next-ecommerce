import { useReducer } from 'react';
import { StoreContext } from '../contexts';

import rootReducer, { initialState } from '../reducer/rootReducer';
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
