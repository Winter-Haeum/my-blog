import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

  login: (email, password) => {
    const ok =
      email === "test@test.com" && password === "1234";

    if (ok) {
      set({ isLoggedIn: true });
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }

    return false;
  },

  logout: () => {
    set({ isLoggedIn: false });
    localStorage.setItem("isLoggedIn", "false");
  },
}));

export default useAuthStore;
