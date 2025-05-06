import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../main-layout/sidebar/AppSidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
