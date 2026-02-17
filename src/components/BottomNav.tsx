import { NavLink } from "react-router-dom";
import { Home, Plus, Settings } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background flex justify-around py-3">
      <NavLink to="/" className="flex flex-col items-center text-sm">
        <Home size={20} />
        Home
      </NavLink>

      <NavLink
        to="/add"
        className="flex flex-col items-center text-sm text-primary"
      >
        <Plus size={22} />
        Add
      </NavLink>

      <NavLink to="/settings" className="flex flex-col items-center text-sm">
        <Settings size={20} />
        Settings
      </NavLink>
    </nav>
  );
}
