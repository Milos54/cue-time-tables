
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AddGame from "./pages/AddGame";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from './firebasehooks/useAuthContext';

const queryClient = new QueryClient();


const App = () => {

  const {authIsReady, user} = useAuthContext()

return  authIsReady &&  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
         { user && <Route path="/login" element={<Navigate to='/'/>} />}
         { !user && <Route path="/login" element={<Login />} />}
          <Route path="/add-game" element={<AddGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>

}
  

export default App;
