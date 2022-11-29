import React from 'react';
import {useNavigate} from 'react-router-dom';

import useLoginStore from '@/store/useLoginStore';

const useIsLogin = (protect: boolean = false): boolean => {
  const isLoggedIn = useLoginStore(state => state.loggedIn);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn && protect) {
      navigate('/home', {replace: true});
    } else {
      navigate('/login', {replace: true});
    }
  }, []);

  return isLoggedIn;
};

export default useIsLogin;
