import React from 'react';
import { Trophy, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { DiscordServer } from '../types';

interface ServerRankingProps {
  servers: DiscordServer[];
}

const ServerRanking: React.FC<ServerRankingProps> = ({ servers }) => {
  const getRankingColor = (ranking: number) => {
    switch (ranking) {
      case 1:
        return 'bg-yellow-500';
      case 2:
        return 'bg-gray-400';
      case 3:
        return 'bg-amber-700';
      default:
        return 'bg-purple-600';
    }
  };

  const getRankingIcon = (ranking: number) => {
    switch (ranking) {
      case 1:
        return '🏆';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return ranking;
    }
  };

  return (
    <div className="bg-[#1A0F2E] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Top Servers</h2>
      </div>

      <div className="space-y-4">
        {servers.map((server, index) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#2D1B4E] rounded-lg p-4 flex items-center gap-4"
          >
            <div className={`w-8 h-8 ${getRankingColor(index + 1)} rounded-full flex items-center justify-center text-white font-bold`}>
              {getRankingIcon(index + 1)}
            </div>

            <img
              src={server.iconUrl}
              alt={server.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />

            <div className="flex-grow">
              <h3 className="text-white font-semibold">{server.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  {server.memberCount}
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={14} className="text-yellow-500" />
                  Level {server.boostLevel}
                </div>
              </div>
            </div>

            <a
              href={server.inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              Join
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServerRanking;