import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function AppShell() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[1280px] px-10 pb-16 pt-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
