import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Music } from "lucide-react";
import * as musicMetadata from "music-metadata-browser";

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  className?: string;
}

interface TrackMetadata {
  title: string;
  artist: string;
  album?: string;
  artwork?: string;
}

const AudioPlayer = ({ src, title: propTitle, artist: propArtist, className = "" }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [metadata, setMetadata] = useState<TrackMetadata>({
    title: propTitle || "Loading...",
    artist: propArtist || "Loading...",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Extract metadata from MP3 file
  useEffect(() => {
    const extractMetadata = async () => {
      try {
        // Fetch the audio file
        const response = await fetch(src);
        const blob = await response.blob();
        
        // Parse metadata
        const meta = await musicMetadata.parseBlob(blob);
        
        let artworkUrl: string | undefined;
        
        // Extract album art if available
        if (meta.common.picture && meta.common.picture.length > 0) {
          const picture = meta.common.picture[0];
          const base64 = btoa(
            new Uint8Array(picture.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          artworkUrl = `data:${picture.format};base64,${base64}`;
        }
        
        setMetadata({
          title: meta.common.title || propTitle || "Unknown Track",
          artist: meta.common.artist || propArtist || "Unknown Artist",
          album: meta.common.album,
          artwork: artworkUrl,
        });
        setIsLoaded(true);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        setMetadata({
          title: propTitle || "Smooth Operator",
          artist: propArtist || "Sade",
        });
        setIsLoaded(true);
      }
    };

    extractMetadata();
  }, [src, propTitle, propArtist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };
    const handleCanPlay = () => setIsLoaded(true);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  const handlePlayerClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      const audio = audioRef.current;
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay prevented:", err);
        });
      }
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Play error:", err));
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`rounded-xl overflow-hidden cursor-pointer ${className}`} 
      style={{ backgroundColor: "hsl(0 0% 12%)" }}
      onClick={handlePlayerClick}
    >
      <audio ref={audioRef} src={src} preload="auto" />
      
      {/* Album Art - Full Width */}
      <div className="relative aspect-square w-full max-w-[200px] mx-auto mt-3">
        {metadata.artwork ? (
          <img 
            src={metadata.artwork} 
            alt={metadata.album || metadata.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div 
            className="w-full h-full rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "hsl(270 50% 25%)" }}
          >
            <Music className="w-16 h-16 text-purple-300/50" />
          </div>
        )}
        
        {/* Click to play overlay */}
        {!hasInteracted && (
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-black ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar - Full Width */}
      <div className="px-3 pt-3">
        <div 
          className="h-1 bg-gray-700 rounded-full cursor-pointer group"
          onClick={handleSeek}
        >
          <div 
            className="h-full rounded-full relative transition-all"
            style={{ 
              width: `${progress}%`,
              background: "linear-gradient(to right, #f97316, #ea580c)"
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Track Info & Controls */}
      <div className="p-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{metadata.title}</p>
            <p className="text-xs text-gray-400 truncate">
              {metadata.artist}{metadata.album ? ` • ${metadata.album}` : ""}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 ml-3">
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            
            <button 
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
