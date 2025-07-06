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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <div>
              <span className="font-bold text-foreground text-lg">David</span>
              <div className="text-xs text-muted-foreground">@Icecreamplayz_YT</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
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
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
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
                      Helper at Silly Development
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
                </div>
              </CardContent>
            </Card>

            {/* Awards Card */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
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
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Section */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Technologies & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs rounded-full px-3 py-1 hover:bg-accent hover:border-primary/50 transition-all duration-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
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
                          <h4 className="font-semibold text-lg">{project.title}</h4>
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
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
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