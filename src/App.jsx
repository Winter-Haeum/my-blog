import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LearnDetail from "./pages/LearnDetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import PostDetail from "./pages/PostDetail";

import GlobalAlert from "./components/common/GlobalAlert";
import useAlertStore from "./store/useAlertStore";

function App() {
  const message = useAlertStore((s) => s.message);
  const buttonText = useAlertStore((s) => s.buttonText);
  const closeAlert = useAlertStore((s) => s.closeAlert);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />

          <Route
            path="write"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route
            path="learn/:topic"
            element={<LearnDetail />}
          />
          <Route
            path="posts/:id"
            element={<PostDetail />}
          />
        </Route>
      </Routes>

      <GlobalAlert
        message={message}
        onClose={closeAlert}
        buttonText={buttonText}
      />
    </>
  );
}

export default App;
