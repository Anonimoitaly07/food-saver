
import { NavLink, useLocation } from "react-router-dom";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, List, ChefHat, BarChart } from "lucide-react";

interface SidebarProps {
  user: User;
  isOpen: boolean;
  toggleSidebar: () => void;
  logoutUser: () => void;
}

const Sidebar = ({ user, isOpen, toggleSidebar, logoutUser }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true
    },
    {
      path: "/dashboard/inventory",
      name: "Inventory",
      icon: <List className="w-5 h-5" />,
      exact: false
    },
    {
      path: "/dashboard/recipes",
      name: "Recipes",
      icon: <ChefHat className="w-5 h-5" />,
      exact: false
    },
    {
      path: "/dashboard/statistics",
      name: "Statistics",
      icon: <BarChart className="w-5 h-5" />,
      exact: false
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-dark-green text-light-beige transition-all duration-300 z-10 ${
        isOpen ? "w-64" : "w-16"
      } shadow-xl`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 h-16">
          {isOpen && (
            <NavLink to="/" className="text-xl font-bold">
              Food Saver
            </NavLink>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg text-light-beige hover:bg-sage hover:text-dark-green transition-colors ${
              !isOpen ? "mx-auto" : ""
            }`}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="px-2 py-4">
            {isOpen && (
              <div className="mb-6 px-3">
                <p className="text-sm text-light-beige/70">Welcome,</p>
                <h3 className="font-medium truncate">{user.username}</h3>
              </div>
            )}

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center ${
                      isOpen ? "px-3 py-2" : "p-2 justify-center"
                    } rounded-lg ${
                      isActive
                        ? "bg-sage/20 text-light-beige"
                        : "text-light-beige/70 hover:bg-sage/10 hover:text-light-beige"
                    } transition-colors`}
                  >
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4">
          <Button
            onClick={logoutUser}
            variant="ghost"
            className={`${
              isOpen ? "w-full" : "w-auto p-2 mx-auto"
            } text-light-beige hover:bg-sage/20`}
          >
            {isOpen ? "Sign Out" : "👋"}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
