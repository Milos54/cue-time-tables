import { Trophy, Target, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../firebasehooks/useAuthContext';
import { useLogout } from '../firebasehooks/useLogout';
import { useState } from 'react';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Mobilijar
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/all-games"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Games
            </a>
            <a
              href="#rankings"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Rankings
            </a>
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => logout()}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-700 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-3 mt-2 pb-4 border-t border-green-100">
            <a
              href="/all-games"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Games
            </a>
            <a
              href="#rankings"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Rankings
            </a>
            {!user ? (
              <button
                onClick={() => {
                  navigate('/login');
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
