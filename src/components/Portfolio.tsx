import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, Pause, Volume2, Repeat,
  Twitter, Youtube, Mail, ExternalLink,
  Code, FolderOpen, Award, GraduationCap, ChevronLeft, ChevronRight
} from "lucide-react";
import backgroundImage from "@/assets/background.jpg";
import robloxBanner from "@/assets/roblox-banner.png";

// Discord & Roblox IDs for integration
const DISCORD_ID = "822804221425614903";
const ROBLOX_ID = "1610763045";
const API_ENDPOINT = "http://209.74.83.91:25566/api/profile";

// Spotify Track: "LET IT HAPPEN" by Tame Impala
const SPOTIFY_TRACK = {
  id: "1Hv1VTm8zeOeybub15mA2R",
  title: "LET IT HAPPEN",
  artist: "Tame Impala",
  cover: "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79",
  duration: "7:46",
  spotifyUrl: "https://open.spotify.com/track/1Hv1VTm8zeOeybub15mA2R"
};

const Portfolio = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [yearsOfExperience, setYearsOfExperience] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [techIndex, setTechIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [audioRef] = useState<HTMLAudioElement | null>(null);

  // Profile data from API
  const [profileData, setProfileData] = useState<{
    discord: {
      user_id?: string;
      username?: string;
      display_name?: string;
      avatar_url?: string;
      status?: string;
      custom_status?: string;
    };
    roblox: {
      user_id?: number;
      username?: string;
      display_name?: string;
      avatar_url?: string;
      friends_count?: number;
      followers_count?: number;
      following_count?: number;
    };
  } | null>(null);

  // Fallback data
  const fallbackDiscord = {
    username: "Realice",
    display_name: "David",
    avatar_url: `https://cdn.discordapp.com/avatars/${DISCORD_ID}/placeholder.png`,
    status: "online",
    custom_status: "Life to no Limits",
  };

  const fallbackRoblox = {
    username: "Realice",
    display_name: "David",
    avatar_url: `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ROBLOX_ID}&size=150x150&format=Png`,
    friends_count: 150,
    followers_count: 89,
    following_count: 45,
  };

  const discordData = profileData?.discord || fallbackDiscord;
  const robloxData = profileData?.roblox || fallbackRoblox;

  useEffect(() => {
    const experienceYears = currentYear >= 2024 ? currentYear - 2024 + 3 : 3;
    setYearsOfExperience(experienceYears);
    document.documentElement.classList.add('dark');

    // Check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fetch profile data from API
    const fetchProfileData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          // Update favicon with Discord avatar
          if (data.discord?.avatar_url) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) link.href = data.discord.avatar_url;
          }
        }
      } catch (error) {
        console.log("Using fallback profile data");
      }
    };

    fetchProfileData();

    return () => window.removeEventListener('resize', checkMobile);
  }, [currentYear]);

  // Progress simulation for music player
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 0.2);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const skillIcons: { [key: string]: string } = {
    "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    "HTML": "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/cobalt",
    "JavaScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "TypeScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "MySQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    "MongoDB": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    "Supabase": "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg",
    "Firebase": "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
    "Discord Bot": "https://cdn.simpleicons.org/discord/blurple",
    "Roblox": "https://cdn.simpleicons.org/roblox/white",
    "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  };

  const skillsArray = Object.entries(skillIcons);
  const visibleSkills = skillsArray.slice(techIndex, techIndex + 3);
  const canScrollLeft = techIndex > 0;
  const canScrollRight = techIndex + 3 < skillsArray.length;

  const projects = [
    { title: "Anti Nuke Bot", role: "Developer / Management", description: "Ultimate Discord Protection with over 1.5M users.", status: "Active", type: "Discord Bot", link: "https://discord.gg/R8jdmteT7X" },
    { title: "NeoDesigns Hosting", role: "Lead Developer", description: "The perfect place for all your hosting solutions.", status: "Active", type: "Hosting", link: "https://discord.gg/neodesigns" },
    { title: "Starlit Profiles", role: "Developer", description: "Everything you need to showcase your creative work.", status: "Active", type: "Portfolio", link: "https://starlit-development.vercel.app" },
    { title: "DiscordGPT", role: "CEO", description: "Discord bot connecting ChatGPT with advanced memory features.", status: "Active", type: "AI Integration" },
    { title: "Guildly", role: "CEO", description: "Discord templating bot for server management.", status: "Ended", type: "Discord Bot" },
  ];

  const connections = [
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://x.com/IcecreamplayzYT", color: "#1DA1F2" },
    { name: "YouTube", icon: <Youtube className="w-5 h-5" />, url: "https://www.youtube.com/@RealiceYT", color: "#FF0000" },
    { name: "Discord", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>, url: `https://discord.com/users/${DISCORD_ID}`, color: "#5865F2" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, url: "mailto:tonasamya@gmail.com", color: "#EA4335" },
  ];

  // Get Roblox avatar URL via the Roblox API (uses their thumbnail service)
  const getRobloxAvatar = () => {
    if (robloxData.avatar_url && robloxData.avatar_url.startsWith('http')) {
      return robloxData.avatar_url;
    }
    return `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ROBLOX_ID}&size=150x150&format=Png`;
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div 
        className="min-h-screen w-screen overflow-x-hidden relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 p-4 space-y-4 pb-24">
          {/* Spotify Player - Top Fixed */}
          <div className="glass-card-strong rounded-2xl p-3 flex items-center gap-3">
            <a href={SPOTIFY_TRACK.spotifyUrl} target="_blank" rel="noopener noreferrer">
              <img src={SPOTIFY_TRACK.cover} alt="Album" className="w-12 h-12 rounded-lg" />
            </a>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{SPOTIFY_TRACK.title}</p>
              <p className="text-xs text-muted-foreground truncate">{SPOTIFY_TRACK.artist}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full progress-glow rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Repeat className="w-4 h-4 text-primary" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="glass-card-strong rounded-2xl p-4">
            <div className="relative -mx-4 -mt-4 mb-4 h-20 overflow-hidden rounded-t-2xl">
              <img src={robloxBanner} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="flex items-center gap-3 -mt-10 relative z-10">
              <div className="relative">
                <img 
                  src={discordData.avatar_url || getRobloxAvatar()}
                  alt="Avatar"
                  className="w-14 h-14 rounded-full border-4 border-black/50 shadow-lg"
                  onError={(e) => { e.currentTarget.src = getRobloxAvatar(); }}
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black status-online" />
              </div>
              <div className="pt-6">
                <h1 className="text-lg font-bold text-foreground">{discordData.display_name || "David"}</h1>
                <p className="text-xs text-muted-foreground">@{discordData.username || "Realice"}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3 italic">"{discordData.custom_status || 'Life to no Limits'}"</p>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="glass-card rounded-lg p-2">
                <p className="text-base font-bold gradient-purple">{yearsOfExperience}</p>
                <p className="text-[9px] text-muted-foreground">Years</p>
              </div>
              <div className="glass-card rounded-lg p-2">
                <p className="text-base font-bold gradient-purple">5+</p>
                <p className="text-[9px] text-muted-foreground">Projects</p>
              </div>
              <div className="glass-card rounded-lg p-2">
                <p className="text-base font-bold gradient-purple">Y11</p>
                <p className="text-[9px] text-muted-foreground">Student</p>
              </div>
            </div>

            {/* Connections */}
            <div className="flex items-center gap-2 mt-4 justify-center">
              {connections.map((conn, i) => (
                <a
                  key={i}
                  href={conn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card connection-icon rounded-full p-2 hover-glow"
                  style={{ '--glow-color': conn.color } as React.CSSProperties}
                >
                  {conn.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Discord & Roblox Integration */}
          <div className="grid grid-cols-2 gap-3">
            {/* Discord */}
            <div className="glass-card-strong rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                <span className="text-xs font-medium">Discord</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src={discordData.avatar_url || getRobloxAvatar()}
                  alt="Discord Avatar"
                  className="w-8 h-8 rounded-full"
                  onError={(e) => { e.currentTarget.src = getRobloxAvatar(); }}
                />
                <div>
                  <p className="text-xs font-medium">{discordData.display_name || "David"}</p>
                  <p className="text-[10px] text-muted-foreground">@{discordData.username || "Realice"}</p>
                </div>
              </div>
            </div>

            {/* Roblox */}
            <div className="glass-card-strong rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <img src="https://cdn.simpleicons.org/roblox/white" alt="Roblox" className="w-4 h-4" />
                <span className="text-xs font-medium">Roblox</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src={getRobloxAvatar()}
                  alt="Roblox Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-xs font-medium">{robloxData.display_name || "David"}</p>
                  <p className="text-[10px] text-muted-foreground">@{robloxData.username || "Realice"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Carousel */}
          <div className="glass-card-strong rounded-2xl p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              Technologies
            </h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 rounded-full glass-card shrink-0"
                onClick={() => setTechIndex(Math.max(0, techIndex - 1))}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {visibleSkills.map(([skill, icon]) => (
                  <div 
                    key={skill}
                    className="glass-card rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover-glow cursor-default transition-all hover:scale-105"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
                      <img 
                        src={icon} 
                        alt={skill} 
                        className="w-5 h-5 object-contain" 
                        onError={(e) => e.currentTarget.style.display = 'none'} 
                      />
                    </div>
                    <span className="text-[9px] font-medium text-center text-muted-foreground leading-tight">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 rounded-full glass-card shrink-0"
                onClick={() => setTechIndex(Math.min(skillsArray.length - 3, techIndex + 1))}
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Projects */}
          <div className="glass-card-strong rounded-2xl p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-primary" />
              Projects
            </h3>
            <div className="space-y-2">
              {projects.slice(0, 3).map((project, i) => (
                <div key={i} className="glass-card rounded-xl p-3 hover-glow transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:text-primary transition-colors flex items-center gap-1">
                          {project.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-xs font-medium">{project.title}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground truncate">{project.description}</p>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"} className="text-[9px] shrink-0">
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Education Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card-strong rounded-2xl p-3">
              <h3 className="text-xs font-semibold mb-2 flex items-center gap-1">
                <Award className="w-3 h-3 text-primary" />
                Awards
              </h3>
              <div className="space-y-1">
                <div className="glass-card rounded-lg p-2">
                  <p className="text-[10px] font-medium">CAIE - ICT</p>
                </div>
                <div className="glass-card rounded-lg p-2">
                  <p className="text-[10px] font-medium">CAIE - English</p>
                </div>
              </div>
            </div>

            <div className="glass-card-strong rounded-2xl p-3">
              <h3 className="text-xs font-semibold mb-2 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-primary" />
                Education
              </h3>
              <div className="glass-card rounded-lg p-2">
                <p className="text-[10px] font-medium">Year 11 - IGCSE</p>
                <p className="text-[9px] text-primary">Head of Database Dev</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="glass-card-strong rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇬🇧</span>
              <div>
                <p className="text-xs font-medium">London, UK</p>
                <p className="text-[10px] text-muted-foreground">English (Native), French (10+ yrs)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div 
      className="h-screen w-screen overflow-hidden relative no-scrollbar"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Content - Single Page Layout */}
      <div className="relative z-10 h-full p-4 md:p-6 flex flex-col lg:flex-row gap-4">
        
        {/* Left Sidebar - Profile & Discord */}
        <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
          {/* Main Profile Card */}
          <div className="glass-card-strong rounded-2xl p-5 flex-shrink-0">
            {/* Banner */}
            <div className="relative -mx-5 -mt-5 mb-4 h-24 overflow-hidden rounded-t-2xl">
              <img src={robloxBanner} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Avatar & Info */}
            <div className="flex items-center gap-4 -mt-12 relative z-10">
              <div className="relative">
                <img 
                  src={discordData.avatar_url || getRobloxAvatar()}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-4 border-black/50 shadow-lg"
                  onError={(e) => { e.currentTarget.src = getRobloxAvatar(); }}
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black status-online" />
              </div>
              <div className="pt-8">
                <h1 className="text-xl font-bold text-foreground">{discordData.display_name || "David"}</h1>
                <p className="text-sm text-muted-foreground">@{discordData.username || "Realice"}</p>
              </div>
            </div>

            {/* Status */}
            <p className="text-xs text-muted-foreground mt-3 italic">"{discordData.custom_status || 'Life to no Limits'}"</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="glass-card rounded-lg p-2">
                <p className="text-lg font-bold gradient-purple">{yearsOfExperience}</p>
                <p className="text-[10px] text-muted-foreground">Years</p>
              </div>
              <div className="glass-card rounded-lg p-2">
                <p className="text-lg font-bold gradient-purple">5+</p>
                <p className="text-[10px] text-muted-foreground">Projects</p>
              </div>
              <div className="glass-card rounded-lg p-2">
                <p className="text-lg font-bold gradient-purple">Y11</p>
                <p className="text-[10px] text-muted-foreground">Student</p>
              </div>
            </div>
          </div>

          {/* Discord Integration Card */}
          <div className="glass-card-strong rounded-2xl p-4 flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              <span className="text-sm font-medium">Discord</span>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src={discordData.avatar_url || getRobloxAvatar()}
                alt="Discord Avatar"
                className="w-10 h-10 rounded-full"
                onError={(e) => { e.currentTarget.src = getRobloxAvatar(); }}
              />
              <div>
                <p className="text-sm font-medium">{discordData.display_name || "David"}</p>
                <p className="text-xs text-muted-foreground">@{discordData.username || "Realice"}</p>
              </div>
            </div>
          </div>

          {/* Roblox Integration Card */}
          <div className="glass-card-strong rounded-2xl p-4 flex-1 min-h-0">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://cdn.simpleicons.org/roblox/white" alt="Roblox" className="w-5 h-5" />
              <span className="text-sm font-medium">Roblox</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={getRobloxAvatar()}
                alt="Roblox Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{robloxData.display_name || "David"}</p>
                <p className="text-xs text-muted-foreground">@{robloxData.username || "Realice"}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="glass-card rounded p-2">
                <p className="font-bold">{robloxData.friends_count || 0}</p>
                <p className="text-muted-foreground">Friends</p>
              </div>
              <div className="glass-card rounded p-2">
                <p className="font-bold">{robloxData.followers_count || 0}</p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div className="glass-card rounded p-2">
                <p className="font-bold">{robloxData.following_count || 0}</p>
                <p className="text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
          {/* Top Bar with Media Controls */}
          <div className="flex items-center justify-end gap-4">
            {/* Spotify Media Controls - Single Song on Repeat */}
            <div className="glass-card-strong rounded-2xl px-4 py-2 flex items-center gap-4 max-w-md">
              <a href={SPOTIFY_TRACK.spotifyUrl} target="_blank" rel="noopener noreferrer">
                <img src={SPOTIFY_TRACK.cover} alt="Album" className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity" />
              </a>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{SPOTIFY_TRACK.title}</p>
                <p className="text-xs text-muted-foreground truncate">{SPOTIFY_TRACK.artist}</p>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full progress-glow rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{SPOTIFY_TRACK.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Repeat className="w-4 h-4 text-primary" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 h-1 bg-muted rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="glass-card-strong rounded-2xl p-6 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              <span className="life-limits-gradient">Life to no Limits</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Passionate developer specializing in Python, Discord bots, and full-stack web development.
              Currently in Year 11, preparing for IGCSE examinations.
            </p>
            
            {/* Connections */}
            <div className="flex items-center gap-3 mt-4 justify-center lg:justify-start">
              {connections.map((conn, i) => (
                <a
                  key={i}
                  href={conn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card connection-icon rounded-full p-3 hover-glow"
                  style={{ '--glow-color': conn.color } as React.CSSProperties}
                >
                  {conn.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-hidden">
            {/* Skills - Carousel Style */}
            <div className="glass-card-strong rounded-2xl p-4 overflow-hidden flex flex-col">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Technologies
              </h3>
              <div className="flex items-center gap-3 flex-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 rounded-full glass-card shrink-0"
                  onClick={() => setTechIndex(Math.max(0, techIndex - 1))}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  {visibleSkills.map(([skill, icon]) => (
                    <div 
                      key={skill}
                      className="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover-glow cursor-default transition-all hover:scale-105 group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                        <img 
                          src={icon} 
                          alt={skill} 
                          className="w-7 h-7 object-contain" 
                          onError={(e) => e.currentTarget.style.display = 'none'} 
                        />
                      </div>
                      <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 rounded-full glass-card shrink-0"
                  onClick={() => setTechIndex(Math.min(skillsArray.length - 3, techIndex + 1))}
                  disabled={!canScrollRight}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card-strong rounded-2xl p-4 overflow-hidden flex flex-col">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-primary" />
                Projects
              </h3>
              <div className="space-y-2 overflow-y-auto no-scrollbar flex-1">
                {projects.map((project, i) => (
                  <div key={i} className="glass-card rounded-xl p-3 hover-glow transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                            {project.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{project.title}</p>
                        )}
                        <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                      </div>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"} className="text-[10px] shrink-0">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Awards & Education */}
        <div className="hidden xl:flex w-72 flex-col gap-4 shrink-0">
          {/* Awards */}
          <div className="glass-card-strong rounded-2xl p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Awards
            </h3>
            <div className="space-y-2">
              <div className="glass-card rounded-lg p-3">
                <p className="text-xs font-medium">CAIE Award</p>
                <p className="text-[10px] text-muted-foreground">Information Communication & Technology</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-xs font-medium">CAIE Award</p>
                <p className="text-[10px] text-muted-foreground">English Language</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="glass-card-strong rounded-2xl p-4 flex-1">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Education
            </h3>
            <div className="space-y-3">
              <div className="glass-card rounded-lg p-3">
                <p className="text-xs font-medium">High School - Year 11</p>
                <p className="text-[10px] text-muted-foreground">Preparing for IGCSE</p>
                <p className="text-[10px] text-primary mt-1">Head of Database Development</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-xs font-medium">Future Studies</p>
                <p className="text-[10px] text-muted-foreground">Software Engineering @ University of Kentucky</p>
              </div>
            </div>
          </div>

          {/* Location & Languages */}
          <div className="glass-card-strong rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🇬🇧</span>
              <div>
                <p className="text-xs font-medium">London, UK</p>
                <p className="text-[10px] text-muted-foreground">English (Native), French (10+ yrs)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
