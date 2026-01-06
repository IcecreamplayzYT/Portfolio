import React, { useMemo, useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, MoreVertical, Music } from "lucide-react";
import jsmediatags from "jsmediatags";

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  className?: string;
}

type ParsedTags = {
  title?: string;
  artist?: string;
  pictureUrl?: string;
};

const AudioPlayer = ({ src, title, artist, className = "" }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [tags, setTags] = useState<ParsedTags>({});

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // ignore autoplay/policy errors
      });
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

  // Parse ID3 tags (local/public MP3 on same origin) to fill the “dummy” UI fields.
  useEffect(() => {
    let cancelled = false;

    // jsmediatags does its own fetch/XHR; this will fail if the file isn’t reachable.
    try {
      jsmediatags.read(src, {
        onSuccess: (result: any) => {
          if (cancelled) return;

          const raw = result?.tags ?? {};
          const parsed: ParsedTags = {
            title: raw.title,
            artist: raw.artist,
          };

          const picture = raw.picture;
          if (picture?.data && picture?.format) {
            const bytes = new Uint8Array(picture.data);
            let binary = "";
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
            parsed.pictureUrl = `data:${picture.format};base64,${btoa(binary)}`;
          }

          setTags(parsed);
        },
        onError: () => {
          if (!cancelled) setTags({});
        },
      });
    } catch {
      setTags({});
    }

    return () => {
      cancelled = true;
    };
  }, [src]);

  const displayTitle = useMemo(() => tags.title || title, [tags.title, title]);
  const displayArtist = useMemo(() => tags.artist || artist, [tags.artist, artist]);

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
          {tags.pictureUrl ? (
            <img
              src={tags.pictureUrl}
              alt={`${displayTitle} cover art`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <Music className="w-6 h-6 text-purple-300" />
          )}
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{displayTitle}</p>
          <p className="text-xs text-gray-400 truncate">{displayArtist}</p>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 mt-1">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Time Display */}
            <span className="text-[10px] text-gray-400 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Progress Bar */}
            <div className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group" onClick={handleSeek}>
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
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* More Options (placeholder) */}
            <button
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              type="button"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;


