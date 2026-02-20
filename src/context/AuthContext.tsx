// ─── Auth0-backed AuthContext ───
// Wraps @auth0/auth0-react so the rest of the app
// never imports Auth0 directly — easy to swap later.

import { createContext, useContext, ReactNode } from "react";
import {
  useAuth0,
  Auth0Provider,
  Auth0ProviderOptions,
} from "@auth0/auth0-react";

// ── shape the rest of the app sees ──────────────────────
interface AuthCtx {
  isLoggedIn: boolean;
  isLoading:  boolean;
  user:       { name?: string; email?: string; picture?: string } | null;
  login:      () => void;
  logout:     () => void;
  getToken:   () => Promise<string>;
}

const AuthContext = createContext<AuthCtx>({
  isLoggedIn: false,
  isLoading:  true,
  user:       null,
  login:      () => {},
  logout:     () => {},
  getToken:   async () => "",
});

export function useAuth() { return useContext(AuthContext); }

// ── inner bridge between Auth0 hooks and our context ───
function AuthBridge({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isAuthenticated,
      isLoading,
      user: user
        ? { name: user.name, email: user.email, picture: user.picture }
        : null,
      login:  () => loginWithRedirect(),
      logout: () => auth0Logout({ logoutParams: { returnTo: window.location.origin } }),
      getToken: () => getAccessTokenSilently(),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── provider to wrap around <App> ───────────────────────
interface Props extends Omit<Auth0ProviderOptions, "children"> {
  children: ReactNode;
}

export function AuthProvider({ children, ...auth0Props }: Props) {
  return (
    <Auth0Provider {...auth0Props}>
      <AuthBridge>{children}</AuthBridge>
    </Auth0Provider>
  );
}
