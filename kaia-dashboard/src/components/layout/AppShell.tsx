import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { MyGardenSidebar } from "./MyGardenSidebar";

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <main className="flex-1 bg-background">
          <div className="mx-auto w-full max-w-[1280px] px-10 pb-16 pt-8">
            <Outlet />
          </div>
        </main>
        <MyGardenSidebar />
      </div>
    </div>
  );
}