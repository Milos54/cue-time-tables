import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import AddGame from './pages/AddGame';
import NotFound from './pages/NotFound';
import { useAuthContext } from './firebasehooks/useAuthContext';
import { Navigation } from './components/Navigation';
import AllGames from './pages/AllGames';

const queryClient = new QueryClient();

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    authIsReady && (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Navigation />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/all-games" element={<AllGames />} />
              {user && <Route path="/login" element={<Navigate to="/" />} />}
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/add-game" element={<AddGame />} />}
              {!user && (
                <Route path="/add-game" element={<Navigate to="/login" />} />
              )}

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    )
  );
};

export default App;
