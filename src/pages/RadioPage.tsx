import React, { useState, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RadioPage: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    playlist, 
    playSong, 
    pauseSong, 
    nextSong, 
    previousSong,
    volume,
    setVolume 
  } = useMusic();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Main Player Section */}
        <div className="bg-gradient-to-br from-[#1A0F2E] to-[#2D1B4E] rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Album Art and Controls */}
            <div className="text-center">
              <motion.div 
                className="relative w-64 h-64 mx-auto mb-6"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <img 
                  src={currentSong?.coverArt || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                  alt={currentSong?.title} 
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
              </motion.div>

              <div className="flex justify-center items-center space-x-6">
                <button 
                  onClick={previousSong}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <SkipBack size={32} />
                </button>
                <button 
                  onClick={isPlaying ? pauseSong : () => currentSong && playSong(currentSong)}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <button 
                  onClick={nextSong}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <SkipForward size={32} />
                </button>
              </div>
            </div>

            {/* Song Info and Progress */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentSong?.title || 'No song playing'}
              </h2>
              <p className="text-xl text-purple-400 mb-6">{currentSong?.artist}</p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-900/30 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#1A0F2E] rounded-xl p-4 cursor-pointer transition-colors ${
                currentSong?.id === song.id ? 'border-2 border-purple-500' : ''
              }`}
              onClick={() => playSong(song)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img 
                    src={song.coverArt || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                    alt={song.title} 
                    className="w-full h-full rounded-lg object-cover"
                  />
                  {currentSong?.id === song.id && isPlaying && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-4 bg-white rounded-full"
                            animate={{ height: [4, 16, 4] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">{song.title}</h3>
                  <p className="text-purple-400 text-sm">{song.artist}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioPage;