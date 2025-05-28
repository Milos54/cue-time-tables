import { Trophy, Users, Calendar } from 'lucide-react';
import { useAuthContext } from '../firebasehooks/useAuthContext';

export const Hero = () => {
  const { user } = useAuthContext();

  return (
    !user && (
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-800/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="text-gray-800">Billiards Game</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Track your progress, compete with friends, and climb the
              leaderboards. The ultimate companion for serious billiards
              players.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Game Tracking
              </h3>
              <p className="text-gray-600">
                Record every match with detailed scores and timestamps
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Rankings
              </h3>
              <p className="text-gray-600">
                Compete and see where you stand among players
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Social Play
              </h3>
              <p className="text-gray-600">
                Challenge friends and track your head-to-head records
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  );
};
