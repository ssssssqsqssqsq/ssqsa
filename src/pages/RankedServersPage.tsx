import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { discordServers } from '../data/servers';

const RankedServersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const serversPerPage = 10;
  const totalPages = Math.ceil(discordServers.length / serversPerPage);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Trophy className="text-amber-700" size={24} />;
      default:
        return <span className="text-lg font-bold text-purple-400">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Server Rankings</h1>

          <div className="grid gap-4">
            {discordServers.slice(0, 3).map((server, index) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-[#1A0F2E] to-[#2D1B4E] rounded-lg p-6 flex items-center gap-6"
              >
                <div className="flex-shrink-0">
                  {getRankBadge(index + 1)}
                </div>
                
                <img
                  src={server.iconUrl}
                  alt={server.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white">{server.name}</h3>
                  <p className="text-purple-400">{server.memberCount.toLocaleString()} members</p>
                </div>

                <a
                  href={server.inviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Join
                </a>
              </motion.div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: 7 }).map((_, index) => (
              <motion.div
                key={`empty-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 3) * 0.1 }}
                className="bg-[#1A0F2E] rounded-lg p-6 flex items-center gap-6"
              >
                <div className="flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">#{index + 4}</span>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center">
                  <span className="text-purple-400">?</span>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-500">Available Slot</h3>
                  <p className="text-purple-400/50">Waiting for server</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-white hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-white hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RankedServersPage;