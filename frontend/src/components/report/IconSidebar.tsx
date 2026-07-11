import { History, LayoutDashboard, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function IconSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: History, label: "History", path: "/dashboard" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-16 flex-col items-center gap-2 border-r border-sidebar-border bg-sidebar py-5">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
      >
        <Search className="size-5" strokeWidth={2.5} />
      </button>
      <nav aria-label="Main navigation" className="flex flex-col gap-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              aria-current={active ? "page" : undefined}
              className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                active ? "bg-sidebar-accent text-primary" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              <span className="sr-only">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}