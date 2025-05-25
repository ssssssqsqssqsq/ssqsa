// context/MusicContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverArt?: string;
};

type MusicContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  volume: number;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const dummyPlaylist: Song[] = [
  {
    id: '1',
    title: 'Test Song',
    artist: 'Reload',
    url: '/songs/test.mp3', // Remplace avec un lien réel
    coverArt: '/covers/test.jpg',
  },
  {
    id: '2',
    title: 'Chill Vibes',
    artist: 'DJ Cool',
    url: '/songs/chill.mp3',
    coverArt: '/covers/chill.jpg',
  },
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist] = useState(dummyPlaylist);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song: Song) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.url);
    } else {
      audioRef.current.pause();
      audioRef.current = new Audio(song.url);
    }

    audioRef.current.volume = volume;
    audioRef.current.play();
    setCurrentSong(song);
    setIsPlaying(true);

    audioRef.current.onended = () => nextSong();
  };

  const pauseSong = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const previousSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
        playlist,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within a MusicProvider");
  return context;
};