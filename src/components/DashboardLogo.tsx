import React from 'react';

import imgBookshelf from '@/assets/bookshelf.png';
import imgBookshelfDark from '@/assets/bookshelf-dark.png';
import useThemeStore from '@/store/useThemeStore';

const DashboardLogo = () => {
  const {isDark} = useThemeStore();

  return (
    <img
      src={isDark() ? imgBookshelfDark : imgBookshelf}
      alt="Bookshelf icon"
      className="w-8 lg:w-12"
    />
  );
};

export default DashboardLogo;
