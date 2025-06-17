import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(false);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    try {
      checkAuthStatus();
    } catch (error) {
      setAuthError(error);
    }
  }, [checkAuthStatus]);

  return { isLoggedIn, authError, logout };
};
