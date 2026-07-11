import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export function DashboardHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-border/60 px-6 py-4 md:px-8">
      <span className="select-none font-mono text-sm font-medium tracking-tight text-foreground">
        Thesis
      </span>
      <button
        onClick={handleLogout}
        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        Log out
      </button>
    </header>
  );
}