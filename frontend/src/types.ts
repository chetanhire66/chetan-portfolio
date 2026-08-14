export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: 'Full-Stack' | 'AI & ML' | 'Hackathon';
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlight: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0-100
    badge?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  icon: string;
  category: string;
  assetUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  description: string;
  status?: string;
  badge: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
