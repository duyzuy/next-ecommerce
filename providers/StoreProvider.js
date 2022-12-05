import { useReducer } from 'react';
import { StoreContext } from '../contexts';
import { viewOrderState, vewOrderReducer } from '../reducer/viewOrder';
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vewOrderReducer, viewOrderState);

  console.log(state);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
