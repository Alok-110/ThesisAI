import { Outlet } from "react-router-dom";
import { IconSidebar } from "../report/IconSidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <IconSidebar />
      <div className="ml-16">
        <Outlet />
      </div>
    </div>
  );
}