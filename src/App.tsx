
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from "./components/layout/MainLayout";
import About from "./pages/About";
import SwimMap from "./pages/SwimMap";
import SwimSpotDetail from "./pages/SwimSpotDetail";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout><SwimMap /></MainLayout>} />
              <Route path="/map" element={<MainLayout><SwimMap /></MainLayout>} />
              <Route path="/map/:city" element={<MainLayout><SwimMap /></MainLayout>} />
              <Route path="/about" element={<MainLayout><About /></MainLayout>} />
              <Route path="/spot/:id" element={<MainLayout><SwimSpotDetail /></MainLayout>} />
              <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
              <Route path="/groups" element={<MainLayout><Groups /></MainLayout>} />
              <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
              <Route path="/blog/:slug" element={<MainLayout><BlogArticle /></MainLayout>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
