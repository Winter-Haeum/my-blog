import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { PostsProvider } from "./context/posts/posts.jsx";
import { ThemeProvider } from "./context/theme/themeContext.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx"; // ✅ 경로/파일명 맞게

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <GlobalStyle /> {/* ✅ 전역 스타일 적용 */}
      <PostsProvider>
        <App />
      </PostsProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
