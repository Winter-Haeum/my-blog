import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useThemeContext는 ThemeWrapper 안에서 사용해야 한다.",
    );
  }
  return ctx;
};
