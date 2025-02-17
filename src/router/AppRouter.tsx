import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";
import { HomePage } from "../pages/page";
import { workerPage } from "../pages/worker";
import { jobPage } from "../pages/job";

export function AppRouter() {
  return (
    <HeroUIProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/worker" Component={workerPage} />
            <Route path="/job" Component={jobPage} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </HeroUIProvider>
  );
}
