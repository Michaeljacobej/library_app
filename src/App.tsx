import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Toaster} from 'react-hot-toast';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import ProtectedRoutes from '@/components/ProtectedRoutes';
import BookDetail from '@/routes/BookDetail';
import ErrorNotFound from '@/routes/ErrorNotFound';
import Home from '@/routes/Home';
import Login from '@/routes/Login';
import Register from '@/routes/Register';
import Root from '@/routes/Root';
import useThemeStore from '@/store/useThemeStore';

library.add(fas, far);

const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/book/:bookId',
    element: (
      <ProtectedRoutes>
        <BookDetail />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/404',
    element: <ErrorNotFound />,
  },
  {
    path: '/',
    element: <Root />,
  },
]);

const App: React.FC = () => {
  const {theme} = useThemeStore();

  React.useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
