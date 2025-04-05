
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { 
  ClerkLoaded, 
  ClerkLoading, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Discussions from "./pages/Discussions";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyPortal from "./pages/FacultyPortal";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PublicRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoading>
          <div className="h-screen w-full flex items-center justify-center">
            <div className="animate-pulse text-2xl font-serif font-bold text-eduBlue-700">
              Loading EduCentral...
            </div>
          </div>
        </ClerkLoading>
        
        <ClerkLoaded>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
            <Route path="/resources" element={<PublicRoute><Resources /></PublicRoute>} />
            <Route path="/discussions" element={<PublicRoute><Discussions /></PublicRoute>} />
            <Route path="/sign-in/*" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/sign-up/*" element={<PublicRoute><SignUp /></PublicRoute>} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/faculty" element={<PrivateRoute><FacultyPortal /></PrivateRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
