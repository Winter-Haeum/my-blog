import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );

  const location = useLocation();

  if (!children) return null;

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
