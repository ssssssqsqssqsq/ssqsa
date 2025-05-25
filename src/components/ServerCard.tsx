import React from 'react';
import { ExternalLink, Users, Crown, Zap, Star } from 'lucide-react';
import { DiscordServer } from '../types';
import { motion } from 'framer-motion';

interface ServerCardProps {
  server: DiscordServer;
}

const categoryColors = {
  gaming: 'bg-purple-600',
  community: 'bg-blue-600',
  advertising: 'bg-emerald-600',
  other: 'bg-amber-600',
};

const categoryLabels = {
  gaming: 'Gaming',
  community: 'Community',
  advertising: 'Advertising',
  other: 'Other',
};

const promotionBadges = {
  basic: { icon: Zap, color: 'bg-blue-500', label: 'Basic' },
  premium: { icon: Star, color: 'bg-purple-500', label: 'Premium' },
  ultimate: { icon: Crown, color: 'bg-yellow-500', label: 'Ultimate' }
};

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const PromotionIcon = server.promotionLevel ? promotionBadges[server.promotionLevel].icon : null;
  
  return (
    <motion.div 
      className={`bg-gradient-to-br from-[#1A0F2E] to-[#2D1B4E] rounded-lg overflow-hidden shadow-lg ${
        server.promoted ? 'border-2 border-purple-500' : ''
      }`}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative">
            <img 
              src={server.iconUrl} 
              alt={server.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
            />
            <span className={`absolute bottom-0 right-0 ${categoryColors[server.category]} text-white text-xs font-medium px-2 py-1 rounded-full`}>
              {categoryLabels[server.category]}
            </span>
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-bold mb-1">{server.name}</h3>
              {server.promoted && PromotionIcon && (
                <span className={`${promotionBadges[server.promotionLevel!].color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center`}>
                  <PromotionIcon className="w-3 h-3 mr-1" />
                  {promotionBadges[server.promotionLevel!].label}
                </span>
              )}
            </div>
            {server.memberCount > 0 && (
              <div className="flex items-center text-purple-300 text-sm">
                <Users size={14} className="mr-1" />
                <span>{server.memberCount.toLocaleString()} members</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 h-20 overflow-hidden">{server.description}</p>
        
        <a 
          href={server.inviteLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Join Server <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

export default ServerCard;