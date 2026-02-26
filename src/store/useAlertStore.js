import { create } from "zustand";

const useAlertStore = create((set) => ({
  message: "",
  buttonText: "확인",
  openAlert: (message, buttonText = "확인") =>
    set({ message, buttonText }),
  closeAlert: () =>
    set({ message: "", buttonText: "확인" }),
}));

export default useAlertStore;
