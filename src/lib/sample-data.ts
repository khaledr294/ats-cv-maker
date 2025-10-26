import { CVData, HexColor } from "@/types/cv";

const sampleEn: CVData = {
  fullName: "Leila Hassan",
  email: "leila.hassan@example.com",
  phone: "+1 (415) 555-7832",
  location: "San Francisco, CA",
  website: "https://leilahassan.dev",
  linkedin: "https://linkedin.com/in/leilahassan",
  github: "https://github.com/leilahassan",
  summary:
    "Product-oriented software engineer with 7+ years of experience building customer-focused platforms across fintech and SaaS. Proven track record leading cross-functional teams, shipping resilient solutions, and mentoring engineers to deliver measurable impact.",
  photoUrl:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  experience: [
    {
      id: "exp-sample-1",
      company: "Navify",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2019-04",
      endDate: "",
      current: true,
      description:
        "• Led modernization of core insurance subscription platform serving 1.2M customers.\n• Architected micro frontends strategy reducing deployment time by 45%.\n• Mentored 6 engineers and instituted quality gates that cut production incidents by 38%.",
      achievements: [],
    },
    {
      id: "exp-sample-2",
      company: "Skyline Labs",
      position: "Full-Stack Engineer",
      location: "Austin, TX",
      startDate: "2016-01",
      endDate: "2019-03",
      current: false,
      description:
        "• Delivered analytics dashboards consumed by 50+ enterprise clients.\n• Introduced CI/CD pipelines that reduced release cycle from monthly to weekly.\n• Collaborated closely with designers to improve accessibility and localization.",
      achievements: [],
    },
  ],
  education: [
    {
      id: "edu-sample-1",
      institution: "University of Texas at Austin",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Austin, TX",
      startDate: "2011-09",
      endDate: "2015-05",
      current: false,
      gpa: "3.8 / 4.0",
      description: "Minor in Product Design, ACM president 2014-2015.",
    },
  ],
  skills: [
    {
      id: "skill-sample-1",
      name: "TypeScript",
      level: "expert",
      category: "Development",
    },
    {
      id: "skill-sample-2",
      name: "React",
      level: "expert",
      category: "Development",
    },
    {
      id: "skill-sample-3",
      name: "Next.js",
      level: "advanced",
      category: "Development",
    },
    {
      id: "skill-sample-4",
      name: "Node.js",
      level: "advanced",
      category: "Backend",
    },
    {
      id: "skill-sample-5",
      name: "GraphQL",
      level: "advanced",
      category: "Backend",
    },
    {
      id: "skill-sample-6",
      name: "Leadership",
      level: "advanced",
      category: "Soft Skills",
    },
  ],
  languages: [
    { id: "lang-sample-1", name: "English", proficiency: "native" },
    { id: "lang-sample-2", name: "Arabic", proficiency: "professional" },
  ],
  projects: [
    {
      id: "proj-sample-1",
      name: "Customer Insights Platform",
      description:
        "Built a self-serve analytics portal with cohort analysis, alerting, and KPI dashboards. Led roadmap with data science and design teams.",
      url: "https://insights.navify.com",
      startDate: "2021-02",
      endDate: "2023-08",
      technologies: ["Next.js", "AWS", "GraphQL"],
    },
  ],
  certifications: [
    {
      id: "cert-sample-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2022-06-01",
      url: "https://aws.amazon.com/certification/",
      expiryDate: "2025-06-01",
    },
  ],
  templateId: "modern",
  language: "en",
  accentColor: "#3B82F6",
};

const sampleAr: CVData = {
  fullName: "محمد حسن",
  email: "mohamed.hassan@example.com",
  phone: "+971 50 123 4567",
  location: "دبي، الإمارات العربية المتحدة",
  website: "https://mohamedhassan.dev",
  linkedin: "https://linkedin.com/in/mohamedhassan",
  github: "https://github.com/mohamedhassan",
  summary:
    "مهندس برمجيات يركز على المنتج بخبرة تتجاوز 7 سنوات في بناء منصات مالية وسحابية. يمتلك سجلًا ناجحًا في قيادة الفرق متعددة التخصصات وتسليم حلول مرنة مع تحسين تجربة المستخدم وجاهزية الأنظمة للسوق.",
  photoUrl:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  experience: [
    {
      id: "exp-sample-ar-1",
      company: "نافيفاي",
      position: "مهندس برمجيات أولى",
      location: "دبي، الإمارات العربية المتحدة",
      startDate: "2019-04",
      endDate: "",
      current: true,
      description:
        "• قيادة تحديث منصة الاشتراكات الأساسية التي تخدم أكثر من 1.2 مليون مستخدم.\n• تصميم بنية micro frontends مما خفّض وقت الإطلاق بنسبة 45٪.\n• تدريب 6 مهندسين ووضع معايير جودة قللت الأعطال الإنتاجية بنسبة 38٪.",
      achievements: [],
    },
    {
      id: "exp-sample-ar-2",
      company: "سكاي لاين لابز",
      position: "مهندس برمجيات كاملة",
      location: "الرياض، المملكة العربية السعودية",
      startDate: "2016-01",
      endDate: "2019-03",
      current: false,
      description:
        "• تطوير لوحات تحكم تحليلية لعملاء المؤسسات، مع زيادة معدل التفاعل بنسبة 30٪.\n• إنشاء خطوط CI/CD خفّضت دورة الإطلاق من شهر إلى أسبوع.\n• التعاون مع فرق التصميم لتحسين الوصولية ودعم اللغات المتعددة.",
      achievements: [],
    },
  ],
  education: [
    {
      id: "edu-sample-ar-1",
      institution: "جامعة الملك سعود",
      degree: "بكالوريوس",
      field: "علوم الحاسب",
      location: "الرياض، السعودية",
      startDate: "2011-09",
      endDate: "2015-05",
      current: false,
      gpa: "3.8 / 4.0",
      description: "مشروع تخرج في تحليل البيانات وقائدة نادي البرمجة.",
    },
  ],
  skills: [
    {
      id: "skill-sample-ar-1",
      name: "TypeScript",
      level: "expert",
      category: "التطوير",
    },
    {
      id: "skill-sample-ar-2",
      name: "React",
      level: "expert",
      category: "التطوير",
    },
    {
      id: "skill-sample-ar-3",
      name: "Next.js",
      level: "advanced",
      category: "التطوير",
    },
    {
      id: "skill-sample-ar-4",
      name: "Node.js",
      level: "advanced",
      category: "الخلفية",
    },
    {
      id: "skill-sample-ar-5",
      name: "GraphQL",
      level: "advanced",
      category: "الخلفية",
    },
    {
      id: "skill-sample-ar-6",
      name: "القيادة",
      level: "advanced",
      category: "مهارات ناعمة",
    },
  ],
  languages: [
    { id: "lang-sample-ar-1", name: "العربية", proficiency: "native" },
    { id: "lang-sample-ar-2", name: "الإنجليزية", proficiency: "professional" },
  ],
  projects: [
    {
      id: "proj-sample-ar-1",
      name: "منصة تحليلات العملاء",
      description:
        "تطوير منصة تحليل ذاتي الخدمة تتضمن تحليل الفئات وتنبيهات الأداء ولوحات مؤشرات تفاعلية، بالتعاون مع فرق علوم البيانات.",
      url: "https://insights.navify.com",
      startDate: "2021-02",
      endDate: "2023-08",
      technologies: ["Next.js", "AWS", "GraphQL"],
    },
  ],
  certifications: [
    {
      id: "cert-sample-ar-1",
      name: "محترف حلول معتمد من AWS",
      issuer: "Amazon Web Services",
      date: "2022-06-01",
      url: "https://aws.amazon.com/certification/",
      expiryDate: "2025-06-01",
    },
  ],
  templateId: "modern",
  language: "ar",
  accentColor: "#6366F1",
};

const stringWithFallback = (
  value: string | undefined,
  fallback: string | undefined
): string => {
  if (value != null) {
    const trimmedValue = value.trim();
    if (trimmedValue.length > 0) {
      return value;
    }
  }

  if (fallback != null) {
    const trimmedFallback = fallback.trim();
    if (trimmedFallback.length > 0) {
      return fallback;
    }
  }

  return "";
};

export function mergeWithSampleData(
  cvData: CVData,
  locale: "en" | "ar"
): CVData {
  const sample = locale === "ar" ? sampleAr : sampleEn;

  return {
    ...sample,
    ...cvData,
    fullName: stringWithFallback(cvData.fullName, sample.fullName),
    email: stringWithFallback(cvData.email, sample.email),
    phone: stringWithFallback(cvData.phone, sample.phone),
    location: stringWithFallback(cvData.location, sample.location),
    website: stringWithFallback(cvData.website, sample.website),
    linkedin: stringWithFallback(cvData.linkedin, sample.linkedin),
    github: stringWithFallback(cvData.github, sample.github),
    summary: stringWithFallback(cvData.summary, sample.summary),
    photoUrl: stringWithFallback(cvData.photoUrl, sample.photoUrl),
    accentColor: (stringWithFallback(cvData.accentColor, sample.accentColor) || "#3B82F6") as HexColor,
    templateId: stringWithFallback(cvData.templateId, sample.templateId),
    language: locale,
    experience:
      cvData.experience && cvData.experience.length > 0
        ? cvData.experience
        : sample.experience,
    education:
      cvData.education && cvData.education.length > 0
        ? cvData.education
        : sample.education,
    skills:
      cvData.skills && cvData.skills.length > 0 ? cvData.skills : sample.skills,
    languages:
      cvData.languages && cvData.languages.length > 0
        ? cvData.languages
        : sample.languages,
    projects:
      cvData.projects && cvData.projects.length > 0
        ? cvData.projects
        : sample.projects,
    certifications:
      cvData.certifications && cvData.certifications.length > 0
        ? cvData.certifications
        : sample.certifications,
  };
}
