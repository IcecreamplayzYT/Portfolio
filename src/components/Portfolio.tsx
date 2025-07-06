import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  Database, 
  Globe, 
  Youtube,
  Twitter,
  Mail,
  Sun,
  Moon,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Languages,
  Trophy
} from "lucide-react";

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

  const skills = [
    "Python Development", "Discord Bot Development", "Website Developer", 
    "Fullstack Developer", "Backend Developer", "Roblox Scripting", 
    "Roblox Animation", "HTML", "Tailwind CSS", "Computer Science"
  ];

  const technologies = [
    "Python", "HTML", "Tailwind", "MySQL", "MongoDB", "Supabase", 
    "Firebase", "YouTube API", "Roblox Studio", "Discord.js"
  ];

  const projects = [
    {
      title: "Main Line Roleplay",
      role: "Head Scripter",
      description: "Realistic train simulation game on Roblox currently in development",
      status: "In Development",
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
      status: "Active",
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
      description: "Managing database development and server infrastructure for educational institution",
      status: "Ongoing",
      type: "Enterprise"
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IY</span>
            </div>
            <span className="font-semibold text-foreground">Icecreamplayz_YT</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-border/40">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">David</CardTitle>
                <CardDescription className="text-muted-foreground">
                  @Icecreamplayz_YT
                </CardDescription>
                <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  London, UK
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Current Role
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Self-employed at ServerSpark Studios
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Helper at Silly Development
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Experience
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {yearsOfExperience} years in development
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Languages className="h-4 w-4 mr-2" />
                      Languages
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      English (Native), French (10+ years)
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://x.com/IcecreamplayzYT" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.youtube.com/@Icecreamplayz_YT" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://discord.com/users/822804221425614903" target="_blank" rel="noopener noreferrer">
                      <User className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Awards Card */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Trophy className="h-5 w-5 mr-2" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Award className="h-4 w-4 mt-1 text-primary" />
                    <div>
                      <p className="font-medium text-sm">CAIE Award</p>
                      <p className="text-xs text-muted-foreground">Information Communication and Technology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="h-4 w-4 mt-1 text-primary" />
                    <div>
                      <p className="font-medium text-sm">CAIE Award</p>
                      <p className="text-xs text-muted-foreground">English Language</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                I turn your digital <span className="text-primary">vision</span> into reality
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Software Engineering and Data Science specialist with expertise in Python development, 
                Discord bot creation, and full-stack web development. Currently pursuing my passion 
                while leading multiple innovative projects.
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
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Section */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Technologies & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FolderOpen className="h-5 w-5 mr-2" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-border/40 rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-primary">{project.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {project.type}
                          </Badge>
                          <Badge 
                            variant={project.status === "Active" ? "default" : "secondary"} 
                            className="text-xs"
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">High School - Year 11</h4>
                    <p className="text-sm text-muted-foreground">Currently preparing for IGCSE examinations</p>
                    <p className="text-sm text-muted-foreground">
                      Head of Database Development and IT Team
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Future Studies</h4>
                    <p className="text-sm text-muted-foreground">
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