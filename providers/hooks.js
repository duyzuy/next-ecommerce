import { useContext } from 'react';
import { StoreContext } from '../contexts';
export const combineReducers = (slices) => (state, action) => {
  Object.keys(slices).forEach((key) => {
    state = {
      ...state,
      [key]: slices[key](state[key], action)
    };
  });

  return state;
};

export const useSelector = (cb) => {
  const [state, _] = useContext(StoreContext);

  if (cb !== undefined && typeof cb === 'function') {
    return cb(state);
  }

  return state;
};

export const useDispatch = () => {
  const [_, dispatch] = useContext(StoreContext);

  return dispatch;
};
