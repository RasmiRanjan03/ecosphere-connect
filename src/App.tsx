import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UploadWaste from "./pages/UploadWaste";
import ClassifyWaste from "./pages/ClassifyWaste";
import Marketplace from "./pages/Marketplace";
import SmartMap from "./pages/SmartMap";
import PollutionHeatmap from "./pages/PollutionHeatmap";
import DiseaseRisk from "./pages/DiseaseRisk";
import Community from "./pages/Community";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="upload" element={<UploadWaste />} />
      <Route path="classify" element={<ClassifyWaste />} />
      <Route path="marketplace" element={<Navigate to="/dashboard/upload" replace />} />
      <Route path="map" element={<SmartMap />} />
      <Route path="pollution" element={<PollutionHeatmap />} />
      <Route path="disease" element={<DiseaseRisk />} />
      <Route path="community" element={<Community />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
