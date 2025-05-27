
import { Trophy, Target } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              BilliardsTracker
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#games" className="text-gray-700 hover:text-green-600 transition-colors">Games</a>
            <a href="#rankings" className="text-gray-700 hover:text-green-600 transition-colors">Rankings</a>
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105">
              New Game
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
