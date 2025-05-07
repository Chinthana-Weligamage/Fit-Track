import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import FullLogo from "@/components/logo/FullLogo";
import { Link, useLocation } from "react-router";

const AppSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <FullLogo />
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent className="p-2">
            <SidebarMenu className="flex flex-col gap-3 mt-10 ml-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      pathname === item.url
                        ? "bg-yellow-400 hover:bg-zinc-500 text-zinc-900"
                        : ""
                    }
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
