import React from 'react';
import {Navigate} from 'react-router-dom';

import useLoginStore from '@/store/useLoginStore';

interface Props {
  children: JSX.Element;
}

const ProtectedRoutes: React.FC<Props> = ({children}) => {
  const isLoggedIn = useLoginStore(state => state.loggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;
