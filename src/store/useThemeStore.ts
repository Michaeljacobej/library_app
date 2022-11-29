import create from 'zustand';
import {persist} from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
  isDark: () => boolean;
  isLight: () => boolean;
  setDark: () => void;
  setLight: () => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light',
      isDark: () => get().theme === 'dark',
      isLight: () => get().theme === 'light',
      setDark: () => set({theme: 'dark'}),
      setLight: () => set({theme: 'light'}),
      toggleTheme: () =>
        set(state => ({theme: state.theme === 'dark' ? 'light' : 'dark'})),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
