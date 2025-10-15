export interface CVData {
  // Personal Information
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  photoUrl?: string;

  // Experience
  experience: WorkExperience[];

  // Education
  education: Education[];

  // Skills
  skills: Skill[];

  // Languages
  languages: Language[];

  // Projects
  projects: Project[];

  // Certifications
  certifications: Certification[];

  // Template & Settings
  templateId: string;
  language: "en" | "ar";
  accentColor: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "basic" | "conversational" | "professional" | "native";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expiryDate?: string;
}

export interface ATSScore {
  overall: number;
  categories: {
    formatting: { score: number; issues: string[] };
    keywords: { score: number; issues: string[] };
    content: { score: number; issues: string[] };
    structure: { score: number; issues: string[] };
  };
  recommendations: string[];
}
