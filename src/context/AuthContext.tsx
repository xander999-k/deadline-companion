import { createContext, useContext, useState, ReactNode } from "react";

interface AuthCtx {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  // Check localStorage so session persists on refresh
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("dp_auth") === "true"
  );

  function login() {
    localStorage.setItem("dp_auth", "true");
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("dp_auth");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
