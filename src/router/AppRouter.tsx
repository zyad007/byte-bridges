import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";
import { WorkerPage } from "../pages/WorkerPage";
import { JobPage } from "../pages/JobPage";
import { LoginPage } from "../pages/LoginPage";
import { ToastContainer } from "react-toastify";

export function AppRouter() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <SidebarProvider>
          <ToastContainer autoClose={3000} position="top-right" />

          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/worker" Component={WorkerPage} />
            <Route path="/job" Component={JobPage} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </HeroUIProvider>
  );
}
