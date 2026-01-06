import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, MoreVertical, Music } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  coverImage?: string;
  className?: string;
}

const AudioPlayer = ({ src, title, artist, coverImage, className = "" }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    audio.play().catch((err) => {
      console.log("Play error:", err);
    });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ backgroundColor: "hsl(240 6% 20%)" }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3 p-3">
        {/* Album Art / Music Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: "hsl(270 50% 35%)" }}
        >
          {coverImage ? (
            <img src={coverImage} alt={`${title} cover`} className="w-full h-full object-cover" />
          ) : (
            <Music className="w-6 h-6 text-purple-300" />
          )}
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          <p className="text-xs text-gray-400">{artist}</p>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 mt-1">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Time Display */}
            <span className="text-[10px] text-gray-400 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Progress Bar */}
            <div
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gray-300 rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Volume Button */}
            <button
              onClick={toggleMute}
              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* More Options */}
            <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
