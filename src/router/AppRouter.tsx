import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";
//import { HomePage } from "../pages/page";
import { workerPage } from "../pages/worker";
import { jobPage } from "../pages/job";
import { LoginPage } from "../pages/login";

export function AppRouter() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/worker" Component={workerPage} />
            <Route path="/job" Component={jobPage} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </HeroUIProvider>
  );
}
