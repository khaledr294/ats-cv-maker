import { Font, StyleSheet } from "@react-pdf/renderer";

// Register Arabic font (Cairo)
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1PiKw.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-a1PiKw.ttf",
      fontWeight: 700,
    },
  ],
});

// Register English font (Inter)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: 700,
    },
  ],
});

// Proficiency labels for languages
export const proficiencyLabels = {
  en: {
    basic: "Basic",
    conversational: "Conversational",
    professional: "Professional",
    native: "Native",
  },
  ar: {
    basic: "مبتدئ",
    conversational: "محادثة",
    professional: "مهني",
    native: "اللغة الأم",
  },
};

// Labels for section headers
export const labels = {
  en: {
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    projects: "Projects",
    certifications: "Certifications",
    present: "Present",
    email: "Email:",
    phone: "Phone:",
    location: "Location:",
    website: "Website:",
  },
  ar: {
    summary: "نبذة مهنية",
    experience: "الخبرات العملية",
    education: "التعليم",
    skills: "المهارات",
    languages: "اللغات",
    projects: "المشاريع",
    certifications: "الشهادات",
    present: "حتى الآن",
    email: "البريد:",
    phone: "الهاتف:",
    location: "الموقع:",
    website: "الموقع:",
  },
};

// Helper function to format phone for display
export const formatPhoneDisplay = (phone?: string) => {
  if (!phone) return "";
  return phone;
};

// Helper function to get photo source for PDF
// @react-pdf/renderer works best with base64 data URLs
export const getPhotoSource = (
  photoUrl?: string,
): { uri: string; cache?: boolean } | string | null => {
  if (!photoUrl) return null;

  // Base64 data URLs work directly
  if (photoUrl.startsWith("data:")) {
    return photoUrl;
  }

  // For external URLs, we need to handle CORS
  // Using object format with cache option helps
  return {
    uri: photoUrl,
    cache: false,
  };
};

// Base styles shared across templates
export const createBaseStyles = (isRTL: boolean) =>
  StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 10,
      lineHeight: 1.4,
      direction: isRTL ? "rtl" : "ltr",
    },
    section: {
      marginBottom: 12,
    },
    text: {
      textAlign: isRTL ? "right" : "left",
    },
  });
