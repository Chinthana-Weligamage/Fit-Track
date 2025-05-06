import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../main-layout/sidebar/AppSidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="bg-zinc-700 w-fit p-1 rounded-e-lg shadow-md shadow-border">
          <SidebarTrigger />
        </div>

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
