import { Calendar, Clock, Trophy, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockGames = [
  {
    id: 1,
    player1: "Alex Johnson",
    player2: "Mike Chen",
    score1: 8,
    score2: 6,
    date: "2024-05-27",
    time: "14:30",
    winner: "Alex Johnson"
  },
  {
    id: 2,
    player1: "Sarah Davis",
    player2: "Tom Wilson",
    score1: 8,
    score2: 4,
    date: "2024-05-26",
    time: "19:15",
    winner: "Sarah Davis"
  },
  {
    id: 3,
    player1: "Mike Chen",
    player2: "Lisa Brown",
    score1: 6,
    score2: 8,
    date: "2024-05-25",
    time: "16:45",
    winner: "Lisa Brown"
  },
  {
    id: 4,
    player1: "Tom Wilson",
    player2: "Alex Johnson",
    score1: 8,
    score2: 7,
    date: "2024-05-24",
    time: "20:00",
    winner: "Tom Wilson"
  }
];

export const GamesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="games" className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Recent Games
            </span>
          </h2>
          <p className="text-xl text-gray-600">Latest matches and results</p>
          
          {/* Add Game Button */}
          <div className="mt-6">
            <button 
              onClick={() => navigate('/add-game')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add New Game
            </button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {mockGames.map((game) => (
            <div 
              key={game.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{game.date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{game.time}</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Completed
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {game.player1.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`font-medium ${game.winner === game.player1 ? 'text-green-600' : 'text-gray-700'}`}>
                      {game.player1}
                    </span>
                    {game.winner === game.player1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{game.score1}</span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {game.player2.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`font-medium ${game.winner === game.player2 ? 'text-green-600' : 'text-gray-700'}`}>
                      {game.player2}
                    </span>
                    {game.winner === game.player2 && <Trophy className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{game.score2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
};
