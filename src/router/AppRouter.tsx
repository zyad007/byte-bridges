import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/page";

export function AppRouter() {

    return (
        <HeroUIProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/" Component={HomePage} />

                </Routes>
            </BrowserRouter>
        </HeroUIProvider>
    )
}