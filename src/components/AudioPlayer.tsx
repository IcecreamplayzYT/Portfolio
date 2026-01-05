// import React, { useState, useRef, useEffect } from "react";
// import { Play, Pause, Volume2, VolumeX, MoreVertical } from "lucide-react";
// import { Music } from "lucide-react";

// interface AudioPlayerProps {
//   src: string;
//   title: string;
//   artist: string;
//   className?: string;
// }

// const AudioPlayer = ({ src, title, artist, className = "" }: AudioPlayerProps) => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration);
//     const handleEnded = () => {
//       audio.currentTime = 0;
//       audio.play();
//     };
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);

//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateDuration);
//     audio.addEventListener("ended", handleEnded);
//     audio.addEventListener("play", handlePlay);
//     audio.addEventListener("pause", handlePause);

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateDuration);
//       audio.removeEventListener("ended", handleEnded);
//       audio.removeEventListener("play", handlePlay);
//       audio.removeEventListener("pause", handlePause);
//     };
//   }, []);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play().catch(err => {
//         console.log("Play error:", err);
//       });
//     }
//   };

//   const toggleMute = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
//     const audio = audioRef.current;
//     if (!audio || !duration) return;

//     const rect = e.currentTarget.getBoundingClientRect();
//     const percent = (e.clientX - rect.left) / rect.width;
//     audio.currentTime = percent * duration;
//   };

//   const formatTime = (time: number) => {
//     if (!time || isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   return (
//     <div className={`rounded-xl overflow-hidden ${className}`} style={{ backgroundColor: "hsl(240 6% 20%)" }}>
//       <audio ref={audioRef} src={src} preload="auto" />
      
//       <div className="flex items-center gap-3 p-3">
//         {/* Album Art / Music Icon */}
//         <div 
//           className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
//           style={{ backgroundColor: "hsl(270 50% 35%)" }}
//         >
//           <Music className="w-6 h-6 text-purple-300" />
//         </div>

//         {/* Track Info & Controls */}
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-white truncate">{title}</p>
//           <p className="text-xs text-gray-400">{artist}</p>
          
//           {/* Playback Controls */}
//           <div className="flex items-center gap-2 mt-1">
//             {/* Play/Pause Button */}
//             <button 
//               onClick={togglePlay}
//               className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
//             >
//               {isPlaying ? (
//                 <Pause className="w-4 h-4" />
//               ) : (
//                 <Play className="w-4 h-4" />
//               )}
//             </button>

//             {/* Time Display */}
//             <span className="text-[10px] text-gray-400 tabular-nums">
//               {formatTime(currentTime)} / {formatTime(duration)}
//             </span>

//             {/* Progress Bar */}
//             <div 
//               className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
//               onClick={handleSeek}
//             >
//               <div 
//                 className="h-full bg-gray-300 rounded-full relative transition-all"
//                 style={{ width: `${progress}%` }}
//               >
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//             </div>

//             {/* Volume Button */}
//             <button 
//               onClick={toggleMute}
//               className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
//             >
//               {isMuted ? (
//                 <VolumeX className="w-4 h-4" />
//               ) : (
//                 <Volume2 className="w-4 h-4" />
//               )}
//             </button>

//             {/* More Options */}
//             <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
//               <MoreVertical className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, MoreVertical, Music } from "lucide-react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [metadata, setMetadata] = useState({
    title: "Loading...",
    artist: "Loading...",
    coverArt: null as string | null
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const loadMetadata = async () => {
      try {
        const response = await fetch(audio.src);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        
        const view = new DataView(arrayBuffer);
        let title = "Smooth Operator";
        let artist = "Unknown Artist";
        let coverArt: string | null = null;
        
        if (view.byteLength > 10) {
          const header = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2));
          if (header === "ID3") {
            let offset = 10;
            const tagSize = ((view.getUint8(6) & 0x7f) << 21) |
                           ((view.getUint8(7) & 0x7f) << 14) |
                           ((view.getUint8(8) & 0x7f) << 7) |
                           (view.getUint8(9) & 0x7f);
            
            while (offset < tagSize + 10 && offset < view.byteLength - 10) {
              const frameId = String.fromCharCode(
                view.getUint8(offset),
                view.getUint8(offset + 1),
                view.getUint8(offset + 2),
                view.getUint8(offset + 3)
              );
              
              const frameSize = view.getUint32(offset + 4);
              
              if (frameSize === 0 || frameSize > tagSize) break;
              
              if (frameId === "TIT2" || frameId === "TPE1") {
                const frameData = new Uint8Array(arrayBuffer, offset + 10, frameSize);
                const text = new TextDecoder('utf-8').decode(frameData.slice(1));
                
                if (frameId === "TIT2") title = text.replace(/\0/g, '').trim();
                if (frameId === "TPE1") artist = text.replace(/\0/g, '').trim();
              }
              
              if (frameId === "APIC") {
                try {
                  const frameData = new Uint8Array(arrayBuffer, offset + 10, frameSize);
                  let dataOffset = 1;
                  
                  while (dataOffset < frameData.length && frameData[dataOffset] !== 0) {
                    dataOffset++;
                  }
                  dataOffset++;
                  
                  dataOffset++;
                  
                  while (dataOffset < frameData.length && frameData[dataOffset] !== 0) {
                    dataOffset++;
                  }
                  dataOffset++;
                  
                  const imageData = frameData.slice(dataOffset);
                  const blob = new Blob([imageData], { type: 'image/jpeg' });
                  coverArt = URL.createObjectURL(blob);
                } catch (err) {
                  console.log("Could not extract cover art:", err);
                }
              }
              
              offset += 10 + frameSize;
            }
          }
        }
        
        setMetadata({ title, artist, coverArt });
      } catch (err) {
        console.log("Could not extract metadata:", err);
        setMetadata({
          title: "Smooth Operator",
          artist: "Unknown Artist",
          coverArt: null
        });
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    
    loadMetadata();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      if (metadata.coverArt) {
        URL.revokeObjectURL(metadata.coverArt);
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.log("Play error:", err);
      });
    }
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "hsl(240 6% 20%)" }}>
          <audio ref={audioRef} src="/music/smooth-operator.mp3" preload="auto" />
          
          <div className="flex items-center gap-3 p-3">
            {/* Album Art / Music Icon */}
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
              style={{ backgroundColor: "hsl(270 50% 35%)" }}
            >
              {metadata.coverArt ? (
                <img src={metadata.coverArt} alt="Album art" className="w-full h-full object-cover" />
              ) : (
                <Music className="w-6 h-6 text-purple-300" />
              )}
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{metadata.title}</p>
              <p className="text-xs text-gray-400">{metadata.artist}</p>
              
              {/* Playback Controls */}
              <div className="flex items-center gap-2 mt-1">
                {/* Play/Pause Button */}
                <button 
                  onClick={togglePlay}
                  className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
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
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* More Options */}
                <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
