import React, { useState, useRef } from 'react';
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2, VolumeX, Plus, Music, X } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
    nextSong,
    previousSong,
    playlist,
    volume,
    setVolume,
    addSong
  } = useMusic();

  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSongUrl && newSongTitle && newSongArtist) {
      addSong({
        id: Date.now().toString(),
        title: newSongTitle,
        artist: newSongArtist,
        url: newSongUrl,
      });
      setNewSongUrl('');
      setNewSongTitle('');
      setNewSongArtist('');
      setIsAddingSong(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-80 bg-[#1A0F2E] shadow-xl z-40 pt-20"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Music className="mr-2" /> ReloadRadio
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="Close music player"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setIsAddingSong(!isAddingSong)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" /> Add Song
              </button>
            </div>

            <AnimatePresence>
              {isAddingSong && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                  onSubmit={handleAddSong}
                >
                  <input
                    type="text"
                    placeholder="Song Title"
                    value={newSongTitle}
                    onChange={(e) => setNewSongTitle(e.target.value)}
                    className="w-full bg-[#2D1B4E] text-white p-2 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Artist"
                    value={newSongArtist}
                    onChange={(e) => setNewSongArtist(e.target.value)}
                    className="w-full bg-[#2D1B4E] text-white p-2 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    value={newSongUrl}
                    onChange={(e) => setNewSongUrl(e.target.value)}
                    className="w-full bg-[#2D1B4E] text-white p-2 rounded-md mb-2"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
                  >
                    Add to Playlist
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {currentSong && (
              <div className="mb-6">
                <div className="text-center mb-4">
                  {currentSong.coverArt ? (
                    <img
                      src={currentSong.coverArt}
                      alt={currentSong.title}
                      className="w-40 h-40 mx-auto rounded-lg shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 mx-auto bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <Music size={48} className="text-white/50" />
                    </div>
                  )}
                </div>

                <h3 className="text-white font-semibold text-center mb-1">{currentSong.title}</h3>
                <p className="text-purple-400 text-sm text-center mb-4">{currentSong.artist}</p>

                <div className="flex justify-center items-center space-x-4 mb-4">
                  <button
                    onClick={previousSong}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    <SkipBack size={24} />
                  </button>

                  <button
                    onClick={isPlaying ? pauseSong : () => currentSong && playSong(currentSong)}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {isPlaying ? <PauseCircle size={36} /> : <PlayCircle size={36} />}
                  </button>

                  <button
                    onClick={nextSong}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
                    {volume === 0 ? (
                      <VolumeX size={20} className="text-white" />
                    ) : (
                      <Volume2 size={20} className="text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="overflow-y-auto max-h-[calc(100vh-500px)]">
              <h3 className="text-white font-semibold mb-2">Playlist</h3>
              {playlist.map((song) => (
                <motion.div
                  key={song.id}
                  className={`p-2 rounded-md cursor-pointer mb-2 ${
                    currentSong?.id === song.id
                      ? 'bg-purple-600'
                      : 'bg-[#2D1B4E] hover:bg-purple-900/50'
                  }`}
                  onClick={() => playSong(song)}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-white text-sm font-medium">{song.title}</p>
                  <p className="text-purple-400 text-xs">{song.artist}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;