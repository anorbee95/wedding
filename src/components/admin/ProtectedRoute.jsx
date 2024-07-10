import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPasscode = localStorage.getItem("passcode");
    const correctPasscode = "Butyike2025";

    if (storedPasscode === correctPasscode) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
