import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get("token");
    if (location.pathname == "/") {
      if (cookie) {
        navigate("/job");
      }
    }
    if (!cookie) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}{" "}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
