import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Download, Tag, Calendar, User } from 'lucide-react';
import { GameMod } from '../types';
import { gameMods, searchMods } from '../data/mods';

const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameMod['category']>('game');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  const filteredMods = searchTerm ? searchMods(searchTerm) : gameMods;

  const categories = [
    { value: 'game', label: 'Games' },
    { value: 'discord', label: 'Discord Servers' },
    { value: 'gameserver', label: 'Game Servers' }
  ];

  const subcategories = {
    game: ['all', 'Publicitaire', 'Gaming', 'Jeu Officiel', 'Communauté', 'Autres'],
    discord: ['all', 'gaming', 'community', 'modding'],
    gameserver: ['all', 'minecraft', 'gta5', 'rust', 'ark']
  };

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Game Catalog</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search mods, servers, and games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A0F2E] border border-purple-900 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as GameMod['category'])}
              className="bg-[#1A0F2E] border border-purple-900 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="bg-[#1A0F2E] border border-purple-900 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {subcategories[selectedCategory].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMods.map((mod) => (
              <motion.div
                key={mod.id}
                className="bg-[#1A0F2E] rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
              >
                <img
                  src={mod.thumbnailUrl}
                  alt={mod.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{mod.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white">{mod.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{mod.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mod.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {mod.author}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {mod.downloads.toLocaleString()}
                    </div>
                  </div>

                  <a
                    href={mod.downloadUrl}
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md transition-colors"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CatalogPage;