import React, { createContext, useContext, useState } from "react";

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
