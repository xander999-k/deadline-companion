import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { DeadlineProvider } from "@/context/DeadlineContext";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Dashboard        from "./pages/Dashboard";
import AddTask          from "./pages/AddTask";
import TaskDetail       from "./pages/TaskDetail";
import SettingsPage     from "./pages/SettingsPage";
import NotFound         from "./pages/NotFound";
import AuthPage         from "./pages/AuthPage";
import HeroScreen       from "./pages/HeroScreen";
import OnboardingScreen from "./pages/OnboardingScreen";

const queryClient = new QueryClient();

// ── Auth0 config — pulled from env vars ────────────────
const AUTH0_DOMAIN    = import.meta.env.VITE_AUTH0_DOMAIN    as string;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

// ── Guard: redirects to /auth if not logged in ─────────
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100dvh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#09090B",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "2px solid #27272A", borderTopColor: "#6366F1",
          animation: "spin 0.7s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AppShell() {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();
  const isAuth = ["/auth", "/hero", "/onboarding"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-app">
      <Routes>
        {/* Auth — redirect to hero if already logged in */}
        <Route
          path="/auth"
          element={(!isLoading && isLoggedIn) ? <Navigate to="/hero" replace /> : <AuthPage />}
        />

        {/* Protected */}
        <Route path="/hero"        element={<PrivateRoute><HeroScreen /></PrivateRoute>} />
        <Route path="/onboarding"  element={<PrivateRoute><OnboardingScreen /></PrivateRoute>} />
        <Route path="/dashboard"   element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/"            element={<PrivateRoute><Navigate to="/hero" replace /></PrivateRoute>} />
        <Route path="/add"         element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/edit/:id"    element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/task/:id"    element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
        <Route path="/settings"    element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

        <Route path="*"            element={<NotFound />} />
      </Routes>

      {!isAuth && isLoggedIn && <BottomNav />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <DeadlineProvider>
          <ToastProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </ToastProvider>
        </DeadlineProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
