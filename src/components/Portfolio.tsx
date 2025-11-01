import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navigation from "./Navigation";
import { 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  Database, 
  Youtube,
  Twitter,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Languages,
  Trophy
} from "lucide-react";
// Profile image will use favicon directly

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentYear] = useState(new Date().getFullYear());
  const [yearsOfExperience, setYearsOfExperience] = useState(3);

  useEffect(() => {
    // Calculate years of experience starting from 2024
    const experienceYears = currentYear >= 2024 ? currentYear - 2024 + 3 : 3;
    setYearsOfExperience(experienceYears);
    
    // Apply theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentYear, isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const skillIcons: { [key: string]: string } = {
    "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    "Discord.py": "https://cdn.simpleicons.org/discord/blurple",
    "HTML": "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/cobalt",
    "JavaScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "TypeScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "MySQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    "MongoDB": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    "Supabase": "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg",
    "Firebase": "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
    "YouTube API": "https://www.svgrepo.com/show/13671/youtube.svg",
    "Roblox Studio": "https://cdn.simpleicons.org/roblox/white",
    "Roblox Scripting": "https://cdn.simpleicons.org/roblox/white",
    "Roblox Animation": "https://cdn.simpleicons.org/roblox/white",
    "Discord Bot Development": "https://cdn.simpleicons.org/discord/blurple",
    "Full-Stack Development": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    "Computer Science": "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    "CSS": "https://cdn.simpleicons.org/css/blurple",
    "MariaDB": "https://cdn.simpleicons.org/mariadb/003545",
    "Roblox Youtuber": "https://www.svgrepo.com/show/13671/youtube.svg"
  };

  const skillCategories = {
    "Core Development": [
      "Python", "Discord.py", "HTML", "Tailwind CSS", "JavaScript", "TypeScript", "CSS"
    ],
    "Backend & Databases": [
      "MySQL", "MongoDB", "Supabase", "Firebase", "YouTube API", "MariaDB"
    ],
    "Game Development": [
      "Roblox Studio", "Roblox Scripting", "Roblox Animation", "Roblox Youtuber"
    ],
    "Specializations": [
      "Discord Bot Development", "Full-Stack Development", "Computer Science"
    ]
  };

  const projects = [
    {
      title: "NeoDesigns Hosting",
      role: "Lead Developer of NeoDesigns Hosting",
      description: "NeoDesigns Hosting the perfect place for all your hosting solutions.",
      status: "Active",
      type: "Application Hosting",
      link: "https://discord.gg/neodesigns"
    },
    {
      title: "Silly Development Helper",
      role: "Helper",
      description: "Good hosting site",
      status: "Ended",
      type: "Application Hosting"
    },
    {
      title: "Main Line Roleplay",
      role: "Lua Scripter",
      description: "Realistic train simulation game on Roblox currently in development",
      status: "Ended",
      type: "Game Development"
    },
    {
      title: "Guildly",
      role: "CEO",
      description: "Discord templating bot for server management and automation",
      status: "Active",
      type: "Discord Bot"
    },
    {
      title: "Designy",
      role: "CEO", 
      description: "Design server bot for expression and emotion through creative tools",
      status: "inactive",
      type: "Discord Bot"
    },
    {
      title: "DiscordGPT",
      role: "CEO",
      description: "Discord bot connecting ChatGPT to Discord with advanced memory features",
      status: "Active",
      type: "AI Integration"
    },
    {
      title: "School Database Development",
      role: "Head of IT Team",
      description: "Managing database development and server infrastructure for an educational institution",
      status: "Ongoing",
      type: "Enterprise"
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">David</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">
                  @Icecreamplayz_YT
                </CardDescription>
                <div className="flex items-center justify-center text-sm text-muted-foreground mt-3 bg-accent/30 rounded-full px-3 py-1.5 inline-flex mx-auto">
                  <MapPin className="h-4 w-4 mr-2" />
                  London, UK
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-accent/20 border border-border/30">
                    <h4 className="font-semibold mb-3 flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      Current Role
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Self-employed at ServerSpark Studios
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Former Sillydev Helper
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-medium mb-1 flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Experience
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {yearsOfExperience} years in development
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-medium mb-1 flex items-center text-sm">
                        <Languages className="h-4 w-4 mr-2 text-primary" />
                        Languages
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        English (Native), French (10+ years)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200" asChild>
                    <a href="https://x.com/IcecreamplayzYT" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200" asChild>
                    <a href="https://www.youtube.com/@Icecreamplayz_YT" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200" asChild>
                    <a href="https://discord.com/users/822804221425614903" target="_blank" rel="noopener noreferrer">
                      <User className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200" asChild>
                    <a href="mailto:tonasamya@gmail.com">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Awards Card */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 border border-border/20">
                    <Award className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">CAIE Award</p>
                      <p className="text-xs text-muted-foreground">Information Communication and Technology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 border border-border/20">
                    <Award className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">CAIE Award</p>
                      <p className="text-xs text-muted-foreground">English Language</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="life-limits-gradient">Life to no Limits</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Passionate developer specializing in Python, Discord bots, and full-stack web development.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div>
                  <span className="font-semibold">{yearsOfExperience}</span>
                  <span className="text-muted-foreground ml-1">years experience</span>
                </div>
                <div>
                  <span className="font-semibold">5+</span>
                  <span className="text-muted-foreground ml-1">active projects</span>
                </div>
                <div>
                  <span className="font-semibold">Year 11</span>
                  <span className="text-muted-foreground ml-1">student</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <Card className="border-border bg-card shadow-lg" id="skills">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Technologies & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 border-l-2 border-primary pl-3">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs rounded-md px-3 py-1 bg-accent/50 border border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center gap-2"
                        >
                          <img 
                            src={skillIcons[skill]} 
                            alt={skill} 
                            className="w-4 h-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="border-border bg-card shadow-lg" id="projects">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FolderOpen className="h-5 w-5 mr-2 text-primary" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="grid gap-4">
                   {projects.map((project, index) => (
                     <div key={index} className="border border-border/20 rounded-xl p-5 hover:bg-accent/30 hover:border-primary/30 transition-all duration-300 bg-card/20">
                       <div className="flex justify-between items-start mb-3">
                         <div>
                           <h4 className="font-semibold text-lg">
                             {project.link ? (
                               <a 
                                 href={project.link} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="hover:text-primary transition-colors"
                               >
                                 {project.title}
                               </a>
                             ) : (
                               project.title
                             )}
                           </h4>
                           <p className="text-sm text-primary font-medium">{project.role}</p>
                         </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs rounded-full">
                            {project.type}
                          </Badge>
                          <Badge 
                            variant={project.status === "Active" ? "default" : "secondary"} 
                            className="text-xs rounded-full"
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="border-border bg-card shadow-lg" id="work">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-accent/20 border border-border/30">
                    <h4 className="font-semibold text-lg">High School - Year 11</h4>
                    <p className="text-sm text-muted-foreground mt-1">Currently preparing for IGCSE examinations</p>
                    <p className="text-sm text-primary font-medium mt-2">
                      Head of Database Development and IT Team
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/10 border border-border/20">
                    <h4 className="font-semibold text-lg">Future Studies</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Planning to pursue Software Engineering and Data Science
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
