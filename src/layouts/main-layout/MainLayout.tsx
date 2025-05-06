import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../main-layout/sidebar/AppSidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Fixed Sidebar Trigger */}
      <div className="fixed bottom-6 left-0 z-50">
        <div className="bg-zinc-700 w-fit p-1 rounded-e-lg shadow-md shadow-border flex items-center justify-center">
          <SidebarTrigger />
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
