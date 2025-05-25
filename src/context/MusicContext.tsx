import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import YouTube from 'react-youtube';
import { Song } from '../types';
import { songs } from '../data/songs';
import { toast } from 'sonner';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  playlist: Song[];
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  addSong: (song: Song) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

useEffect(() => {
  if (songs.length > 0) {
    playSong(songs[0]);
  }
}, []);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>(songs);
  const [volume, setVolumeState] = useState(0.3);
  const [previousVolume, setPreviousVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const addSong = useCallback((song: Song) => {
    if (!getYouTubeId(song.url)) {
      toast.error('Invalid YouTube URL');
      return;
    }
    setPlaylist((prev) => [...prev, song]);
    toast.success('Song added to playlist');
  }, []);

  const playSong = useCallback((song: Song) => {
    if (currentSong?.id === song.id) {
      playerRef.current?.playVideo();
      setIsPlaying(true);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  }, [currentSong]);

  const pauseSong = useCallback(() => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  }, []);

  const nextSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  }, [currentSong, playlist, playSong]);

  const previousSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  }, [currentSong, playlist, playSong]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  }, [volume, previousVolume, setVolume]);

  const youtubePlayer = currentSong && (
    <div className="hidden">
      <YouTube
        videoId={getYouTubeId(currentSong.url)}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: ,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
          event.target.setVolume(volume * 100);
          if (isPlaying) {
            event.target.playVideo();
          }
        }}
        onStateChange={(event) => {
          if (event.data === YouTube.PlayerState.ENDED) {
            nextSong();
          } else if (event.data === YouTube.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === YouTube.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        }}
        onError={() => {
          console.error('YouTube player error');
          toast.error('Error playing song');
          nextSong();
        }}
      />
    </div>
  );

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        playlist,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
        setVolume,
        toggleMute,
        addSong,
      }}
    >
      {youtubePlayer}
      {children}
    </MusicContext.Provider>
  );
};
