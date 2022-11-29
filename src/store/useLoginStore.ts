import create from 'zustand';
import {persist} from 'zustand/middleware';

interface LoginState {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    set => ({
      loggedIn: false,
      doLogin: () => set({loggedIn: true}),
      doLogout: () => set({loggedIn: false}),
    }),
    {
      name: 'login-storage',
    }
  )
);

export default useLoginStore;
