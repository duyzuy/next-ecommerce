import { useState, useEffect } from 'react';
import { wpClient } from '../api/client';
const useAuth = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token !== undefined) {
      (async () => {
        const response = await wpClient.get(`wp/v2/users/me`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        if (response?.data?.status === 403) {
          setIsLogedIn(false);
        } else {
          setIsLogedIn(true);
        }
      })();
    }
  }, []);
  return { isLogedIn };
};

export default useAuth;
