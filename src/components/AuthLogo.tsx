import React from 'react';

import imgBookshelf from '@/assets/bookshelf.png';
import imgBookshelfDark from '@/assets/bookshelf-dark.png';
import useThemeStore from '@/store/useThemeStore';

const AuthLogo = () => {
  const {isDark} = useThemeStore();

  return (
    <img
      src={isDark() ? imgBookshelfDark : imgBookshelf}
      alt="Bookshelf icon"
      className="w-12 md:w-16 lg:w-24"
    />
  );
};

export default AuthLogo;
