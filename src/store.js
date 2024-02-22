import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


function jwtDecode(t) {
    if (!t) return;
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
}

export const useUserStore = create(
    persist(
      (set) => ({
        token: "",
        role: "",
        email: "",
        setToken: (token) => {
            set({ token:token });
            const decodedToken = jwtDecode(token);
            set({ role: decodedToken?.payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] });
        }
      }),
      {
        name: 'token',
        storage: createJSONStorage(() => localStorage),
      }
    )
);