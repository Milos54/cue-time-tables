
import { Trophy, TrendingUp, Medal } from "lucide-react";

const mockRankings = [
  {
    rank: 1,
    player: "Sarah Davis",
    wins: 24,
    losses: 8,
    winRate: 75,
    points: 1250
  },
  {
    rank: 2,
    player: "Alex Johnson",
    wins: 22,
    losses: 10,
    winRate: 69,
    points: 1180
  },
  {
    rank: 3,
    player: "Mike Chen",
    wins: 18,
    losses: 12,
    winRate: 60,
    points: 980
  },
  {
    rank: 4,
    player: "Tom Wilson",
    wins: 16,
    losses: 14,
    winRate: 53,
    points: 820
  },
  {
    rank: 5,
    player: "Lisa Brown",
    wins: 14,
    losses: 16,
    winRate: 47,
    points: 720
  },
  {
    rank: 6,
    player: "James Rodriguez",
    wins: 12,
    losses: 18,
    winRate: 40,
    points: 650
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  }
};

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    case 3:
      return "bg-gradient-to-r from-amber-500 to-amber-600";
    default:
      return "bg-gradient-to-r from-green-500 to-green-600";
  }
};

export const RankingsSection = () => {
  return (
    <section id="rankings" className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Player Rankings
            </span>
          </h2>
          <p className="text-xl text-gray-600">See who's dominating the tables</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-white font-semibold">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2">W/L</div>
              <div className="col-span-2">Win Rate</div>
              <div className="col-span-2">Points</div>
              <div className="col-span-1">Trend</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {mockRankings.map((player) => (
              <div 
                key={player.rank} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <div className={`w-8 h-8 rounded-full ${getRankBg(player.rank)} flex items-center justify-center`}>
                      {player.rank <= 3 ? (
                        getRankIcon(player.rank)
                      ) : (
                        <span className="text-sm font-bold text-white">#{player.rank}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {player.player.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{player.player}</div>
                        <div className="text-sm text-gray-500">{player.wins + player.losses} games played</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{player.wins}-{player.losses}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${player.winRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{player.winRate}%</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="text-center">
                      <span className="font-bold text-lg text-gray-800">{player.points}</span>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex justify-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </section>
  );
};
