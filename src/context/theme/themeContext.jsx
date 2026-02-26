import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../../styles/theme";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const emotionTheme = isDarkMode ? darkTheme : lightTheme;

  const value = useMemo(() => {
    return { isDarkMode, toggleTheme };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={emotionTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  return ctx;
}
