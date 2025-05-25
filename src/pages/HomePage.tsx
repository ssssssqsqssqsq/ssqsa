import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Music, Play, Pause, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import { motion } from 'framer-motion';
import ServerRanking from '../components/ServerRanking';
import { getRankedServers } from '../data/servers';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { playlist, playSong, currentSong, isPlaying, pauseSong } = useMusic();
  const rankedServers = getRankedServers();

  // Auto play music when page loads
  useEffect(() => {
    if (playlist.length > 0) {
      playSong(playlist[0]);
    }
  }, [playlist, playSong]);

  return (
    <div className="min-h-screen bg-[#0F0518] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7130497/pexels-photo-7130497.jpeg?auto=compress&cs=tinysrgb&w=1280')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0518]/90 via-[#1A0F2E]/90 to-[#2D1B4E]/90"></div>
          
          {/* Animated gradient circles */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              ReloadWeb
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with the ultimate Discord advertising server. Grow your community faster.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link 
                  to="/servers" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                >
                  Browse Servers <ArrowRight size={20} className="ml-2" />
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                >
                  Login with Discord
                </Link>
              )}
              
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-purple-500 hover:border-purple-400 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Radio Section */}
      <section className="py-20 bg-[#1A0F2E] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
                <Music className="mr-3 text-purple-400" />
                ReloadRadio Live
              </h2>
              <p className="text-gray-300">Listen to our curated playlist while browsing servers</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {currentSong && (
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                      <img 
                        src={currentSong.coverArt || "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{currentSong.title}</h3>
                          <p className="text-purple-400">{currentSong.artist}</p>
                        </div>
                        <button
                          onClick={isPlaying ? pauseSong : () => playSong(currentSong)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors"
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <Volume2 size={20} className="text-purple-400" />
                        <div className="flex-1 h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <h4 className="text-lg font-semibold mb-4">Coming Up Next</h4>
                  <div className="grid gap-4">
                    {playlist.slice(1, 4).map((song) => (
                      <motion.div 
                        key={song.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-purple-900/20 cursor-pointer"
                        whileHover={{ x: 10 }}
                      >
                        <img 
                          src={song.coverArt || "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                          alt={song.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h5 className="font-medium">{song.title}</h5>
                          <p className="text-sm text-purple-400">{song.artist}</p>
                        </div>
                        <Play size={16} className="ml-auto text-purple-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-600/10 filter blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-600/10 filter blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Server Ranking Section */}
      <section className="py-20 bg-[#1A0F2E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <ServerRanking servers={rankedServers} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1A0F2E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Join Reload?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Grow Your Community</h3>
                <p className="text-gray-300">Connect with other server owners and expand your Discord community faster.</p>
              </div>
              
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Active Promotion</h3>
                <p className="text-gray-300">Your server gets active promotion to our large community of Discord enthusiasts.</p>
              </div>
              
              <div className="bg-[#2D1B4E] p-6 rounded-lg">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Control</h3>
                <p className="text-gray-300">We verify all servers to ensure a high-quality community without spam or harmful content.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F0518]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Discord Server?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Reload today and connect with a vibrant community of Discord enthusiasts.
            </p>
            
            <Link 
              to="/servers" 
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center"
            >
              Get Started <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;