// src/styles/theme.js

export const breakpoints = {
  mobile: 768,
  desktop: 992,
};

export const lightTheme = {
  mode: "light",
  colors: {
    primary: "#8A4FFF",
    secondary: "#D4BBFF",
    accent: "#FFB7D5",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#212529",
    textSecondary: "#868e96",
    border: "#eaeaea",
    error: "#ff4d4f",
    success: "#52c41a",
    warning: "#faad14",
    info: "#1890ff",
    card: "#f5f6f8",
  },
  spacing: {
    pagePaddingDesktop: "24px",
    pagePaddingMobile: "12px",
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    primary: "#A673FF",
    secondary: "#D4BBFF",
    accent: "#FFB7D5",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#f8f9fa",
    textSecondary: "#adb5bd",
    border: "#495057",
    error: "#ff7875",
    success: "#73d13d",
    warning: "#ffc53d",
    info: "#40a9ff",
    card: "#1a1b22",
  },
  spacing: {
    pagePaddingDesktop: "24px",
    pagePaddingMobile: "12px",
  },
};

/*
  ⚠️ 기존의 `export const theme = lightTheme;` 제거

  이유:
  - 다크/라이트/커스터마이징이 들어가면 "theme 하나"를 export하는 방식은 헷갈림
  - 실제 theme는 ThemeWrapper(Provider)에서 선택해서 내려주는 게 정답임
*/
