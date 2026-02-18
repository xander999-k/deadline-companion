import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { DeadlineProvider } from "@/context/DeadlineContext";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Dashboard    from "./pages/Dashboard";
import AddTask      from "./pages/AddTask";
import TaskDetail   from "./pages/TaskDetail";
import SettingsPage from "./pages/SettingsPage";
import NotFound     from "./pages/NotFound";
import AuthPage     from "./pages/AuthPage";

const queryClient = new QueryClient();

/* Blocks any route if not logged in — redirects to /auth */
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AppShell() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isAuth = location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-app">
      <Routes>
        {/* Public */}
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" replace /> : <AuthPage />}
        />

        {/* Protected */}
        <Route path="/"         element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add"      element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/task/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="*"         element={<NotFound />} />
      </Routes>

      {/* Hide bottom nav on auth screen */}
      {!isAuth && isLoggedIn && <BottomNav />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
