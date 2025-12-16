import { Navigate } from "react-router-dom";

// Protect pages that need login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If not logged in → redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
