
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { User } from "./lib/types";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // User authentication state with localStorage persistence
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  const loginUser = (userData: User) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };
  
  const logoutUser = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index user={user} logoutUser={logoutUser} />} />
            <Route path="/login" element={
              user ? <Navigate to="/dashboard" /> : <Login loginUser={loginUser} />
            } />
            <Route path="/register" element={
              user ? <Navigate to="/dashboard" /> : <Register loginUser={loginUser} />
            } />
            <Route 
              path="/dashboard/*" 
              element={
                user ? <Dashboard user={user} logoutUser={logoutUser} /> : <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
