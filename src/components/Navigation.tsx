import { Button } from "@/components/ui/button";
import { 
  Home,
  FolderOpen,
  Briefcase,
  Mail,
  Sun,
  Moon
} from "lucide-react";
import avatarImage from "@/assets/avatar.png";

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: FolderOpen, label: "Projects", href: "#projects" },
    { icon: Briefcase, label: "Work", href: "#work" },
    { icon: Mail, label: "Contact", href: "mailto:icecreamplayz.yt@gmail.com" },
  ];

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src="/lovable-uploads/7e25d292-2d3f-44ce-b808-fc0ec2475630.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-foreground font-semibold">
              Helper at{" "}
              <a 
                href="https://sillydev.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Silly Development
              </a>
              {" | "}
              <a 
                href="https://discord.gg/sillydev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Discord
              </a>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                asChild
              >
                <a href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              </Button>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg ml-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;