import { createContext } from 'react';
const AppContext = createContext<{ isLoading: boolean }>({ isLoading: false });
export default AppContext;
