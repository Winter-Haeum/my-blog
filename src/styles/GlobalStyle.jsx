// GlobalStyle.jsx

import { Global, css, useTheme } from "@emotion/react";

const style = (theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    overflow-x: hidden; /* 🔥 오른쪽 넘침 방지 */
  }

  body {
    font-family:
      Pretendard, system-ui, Avenir, Helvetica, Arial,
      sans-serif;
    line-height: 1.5;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default function GlobalStyle() {
  const theme = useTheme(); // 🔥 theme 받아오기
  return <Global styles={style(theme)} />;
}
