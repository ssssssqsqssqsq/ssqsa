import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ServerCard from '../components/ServerCard';
import { discordServers, promotedServers } from '../data/servers';
import { Search, Filter, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const ServersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPromoted, setShowPromoted] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const servers = showPromoted ? promotedServers : discordServers;
  
  const filteredServers = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         server.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || server.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'community', label: 'Community' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {showPromoted ? 'Featured Servers' : 'Discord Servers'}
            </h1>
            <button
              onClick={() => setShowPromoted(!showPromoted)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showPromoted 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#1A0F2E] text-purple-400 hover:bg-purple-600/20'
              }`}
            >
              {showPromoted ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              {showPromoted ? 'Featured' : 'Regular'}
            </button>
          </div>

          <p className="text-gray-300 mb-8 max-w-2xl">
            {showPromoted 
              ? 'Discover our featured servers with enhanced visibility and premium benefits.'
              : 'Discover and join the best Discord servers in our network. Each server is verified for quality and active community.'}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A0F2E] border border-purple-900 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            
            <div className="relative md:w-72">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1A0F2E] border border-purple-900 rounded-md py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {filteredServers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServers.map((server, index) => (
                <motion.div
                  key={server.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServerCard server={server} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No servers found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          {!showPromoted && (
            <div className="mt-12 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Want to promote your server?</h2>
              <p className="text-gray-300 mb-6">
                Get featured placement, custom branding, and priority support for your Discord server.
              </p>
              <a
                href="/shop"
                className="inline-flex items-center bg-white text-purple-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Crown className="w-5 h-5 mr-2" />
                Boost Your Server
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ServersPage;