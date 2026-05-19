import { NavLink } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/focus", label: "Focus" },
  { to: "/library", label: "Library" },
  { to: "/settings", label: "Settings" },
] as const;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-header shadow-[0_4px_20px_rgba(115,92,0,0.12)]">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-10">
        <NavLink to="/" className="text-3xl font-semibold text-accent-goldDark">
          Kaia
        </NavLink>

        <nav className="flex items-center gap-8">
          {navItems.map(({ to, label, ...rest }) => (
            <NavLink
              key={to}
              to={to}
              {...rest}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "border-b-2 border-accent-goldDark pb-0.5 text-accent-goldDark"
                    : "text-muted hover:text-foreground"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-accent-goldDark">
          <button
            type="button"
            className="rounded-full p-1 hover:bg-black/5"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
          </button>
          <NavLink
            to="/settings"
            className="rounded-full p-1 hover:bg-black/5"
            aria-label="Settings"
          >
            <Settings className="h-6 w-6" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
