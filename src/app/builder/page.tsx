"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Download, Eye, Globe, Moon, Sun } from "lucide-react";
import { CVData, WorkExperience, Education, Skill } from "@/types/cv";
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
  AcademicTemplate,
  DeveloperTemplate,
  TwoColumnTemplate,
  InfographicTemplate,
} from "@/components/templates";
import { ATSScoreCard } from "@/components/ATSScoreCard";
import { calculateATSScore } from "@/lib/ats-analyzer";
import { exportToPDF, exportToPDFLegacy } from "@/lib/export";
import { mergeWithSampleData } from "@/lib/sample-data";
import { toast } from "sonner";
import {
  PersonalInfoForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  TemplateSelector,
} from "@/components/builder";

const LOCALE_STORAGE_KEY = "cv-maker:locale";
const THEME_STORAGE_KEY = "cv-maker:theme";

export default function BuilderPage() {
  const [locale, setLocale] = useState<"en" | "ar">("ar");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCVData] = useState<CVData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photoUrl: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certifications: [],
    templateId: "modern",
    language: "ar",
    accentColor: "#3B82F6",
  });
  const previewInnerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const printRef = useRef<HTMLDivElement>(null);
  const [showSampleData, setShowSampleData] = useState(true);
  const displayData = useMemo(
    () => (showSampleData ? mergeWithSampleData(cvData, locale) : cvData),
    [cvData, locale, showSampleData],
  );

  const applyDocumentLocale = (nextLocale: "en" | "ar") => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = nextLocale;
    }
  };

  const updateLocale = (nextLocale: "en" | "ar") => {
    setLocale(nextLocale);
    setCVData((prev) => ({ ...prev, language: nextLocale }));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      applyDocumentLocale(nextLocale);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale === "en" || storedLocale === "ar") {
      setLocale(storedLocale);
      setCVData((prev) => ({ ...prev, language: storedLocale }));
      applyDocumentLocale(storedLocale);
    } else {
      setLocale("ar");
      setCVData((prev) => ({ ...prev, language: "ar" }));
      window.localStorage.setItem(LOCALE_STORAGE_KEY, "ar");
      applyDocumentLocale("ar");
    }
    // Load theme
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (cvData.language && cvData.language !== locale) {
      setLocale(cvData.language);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, cvData.language);
      }
      applyDocumentLocale(cvData.language);
    }
  }, [cvData.language, locale]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = previewContainerRef.current;
    if (!container) return;

    const TEMPLATE_WIDTH = 794;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      const nextScale = Math.min(1, availableWidth / TEMPLATE_WIDTH);
      setPreviewScale(nextScale || 1);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const steps =
    locale === "en"
      ? [
          "Template",
          "Personal Info",
          "Experience",
          "Education",
          "Skills",
          "ATS Score",
          "Preview",
        ]
      : [
          "القالب",
          "المعلومات الشخصية",
          "الخبرات",
          "التعليم",
          "المهارات",
          "تقييم ATS",
          "المعاينة",
        ];

  const handleExportPDF = async () => {
    try {
      // Use new @react-pdf/renderer for proper Arabic support
      await exportToPDF({ cvData: displayData });
      toast.success(
        locale === "en" ? "PDF exported successfully!" : "تم تصدير PDF بنجاح!",
      );
    } catch (error) {
      console.error("PDF export error:", error);
      // Fallback to legacy export
      const exportElement = printRef.current || previewInnerRef.current;
      if (exportElement) {
        try {
          const exportScale = printRef.current
            ? 2
            : Math.max(2, 2 / previewScale);
          await exportToPDFLegacy({
            element: exportElement,
            cvData: displayData,
            scale: exportScale,
          });
          toast.success(
            locale === "en"
              ? "PDF exported successfully!"
              : "تم تصدير PDF بنجاح!",
          );
        } catch {
          toast.error(
            locale === "en" ? "Failed to export PDF" : "فشل تصدير PDF",
          );
        }
      } else {
        toast.error(
          locale === "en"
            ? "Preview is not ready yet"
            : "المعاينة غير جاهزة حالياً",
        );
      }
    }
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    };
    setCVData({ ...cvData, experience: [...cvData.experience, newExp] });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean | string[],
  ) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    };
    setCVData({ ...cvData, education: [...cvData.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string | boolean,
  ) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate",
      category: "",
    };
    setCVData({ ...cvData, skills: [...cvData.skills, newSkill] });
  };

  const removeSkill = (id: string) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((skill) => skill.id !== id),
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    });
  };

  const renderTemplate = () => {
    const TemplateComponent =
      {
        modern: ModernTemplate,
        classic: ClassicTemplate,
        creative: CreativeTemplate,
        minimal: MinimalTemplate,
        executive: ExecutiveTemplate,
        academic: AcademicTemplate,
        developer: DeveloperTemplate,
        twocolumn: TwoColumnTemplate,
        infographic: InfographicTemplate,
      }[displayData.templateId] || ModernTemplate;

    return (
      <TemplateComponent
        data={displayData}
        className="w-[794px] min-h-[1123px] mx-auto"
      />
    );
  };

  const atsScore = calculateATSScore(cvData);

  return (
    <div
      className={`min-h-screen ${
        locale === "ar" ? "font-cairo" : "font-inter"
      }`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">CV Maker</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateLocale(locale === "en" ? "ar" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {locale === "en" ? "العربية" : "English"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(steps.length - 1)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {locale === "en" ? "Preview" : "معاينة"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" type="button">
                  <Download className="w-4 h-4 mr-2" />
                  {locale === "en" ? "Export" : "تصدير"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF}>
                  📄 {locale === "en" ? "Export PDF" : "تصدير PDF"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b bg-secondary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                aria-label={`${locale === "ar" ? "الخطوة" : "Step"} ${
                  index + 1
                }: ${step}`}
                aria-current={currentStep === index ? "step" : undefined}
                className={`flex items-center gap-2 transition-colors whitespace-nowrap px-2 ${
                  currentStep === index
                    ? "text-primary font-semibold"
                    : currentStep > index
                      ? "text-green-600"
                      : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep > index
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="hidden md:inline text-sm">{step}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep]}</CardTitle>
                <CardDescription>
                  {locale === "en"
                    ? "Fill in your information step by step"
                    : "املأ معلوماتك خطوة بخطوة"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {/* Step 0: Template Selection */}
                {currentStep === 0 && (
                  <TemplateSelector
                    cvData={cvData}
                    displayData={displayData}
                    locale={locale}
                    showSampleData={showSampleData}
                    onTemplateChange={(templateId) =>
                      setCVData({ ...cvData, templateId })
                    }
                    onColorChange={(accentColor) =>
                      setCVData({
                        ...cvData,
                        accentColor: accentColor as CVData["accentColor"],
                      })
                    }
                    onToggleSampleData={setShowSampleData}
                  />
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <PersonalInfoForm
                    cvData={cvData}
                    displayData={displayData}
                    locale={locale}
                    onUpdate={(updates) => setCVData({ ...cvData, ...updates })}
                  />
                )}

                {/* Step 2: Experience */}
                {currentStep === 2 && (
                  <ExperienceForm
                    experience={cvData.experience}
                    locale={locale}
                    onAdd={addExperience}
                    onRemove={removeExperience}
                    onUpdate={updateExperience}
                  />
                )}

                {/* Step 3: Education */}
                {currentStep === 3 && (
                  <EducationForm
                    education={cvData.education}
                    locale={locale}
                    onAdd={addEducation}
                    onRemove={removeEducation}
                    onUpdate={updateEducation}
                  />
                )}

                {/* Step 4: Skills */}
                {currentStep === 4 && (
                  <SkillsForm
                    skills={cvData.skills}
                    locale={locale}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    onUpdate={updateSkill}
                  />
                )}

                {/* Step 5: ATS Score */}
                {currentStep === 5 && (
                  <ATSScoreCard score={atsScore} language={locale} />
                )}

                {/* Step 6: Preview */}
                {currentStep === 6 && (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold mb-4">
                      {locale === "en"
                        ? "Your CV is ready!"
                        : "سيرتك الذاتية جاهزة!"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {locale === "en"
                        ? "Review your CV in the preview panel and export when ready."
                        : "راجع سيرتك الذاتية في لوحة المعاينة وقم بالتصدير عندما تكون جاهزاً."}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={handleExportPDF} size="lg">
                        📄 Export PDF
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    {locale === "en" ? "← Previous" : "السابق ←"}
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(steps.length - 1, currentStep + 1),
                      )
                    }
                    disabled={currentStep === steps.length - 1}
                  >
                    {locale === "en" ? "Next →" : "→ التالي"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {locale === "en" ? "Live Preview" : "معاينة مباشرة"}
                  </span>
                  <div className="flex flex-col items-end gap-1 text-xs font-normal text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          atsScore.overall >= 80
                            ? "bg-green-500"
                            : atsScore.overall >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span>ATS: {atsScore.overall}/100</span>
                    </div>
                    <span>
                      {locale === "en"
                        ? "Heuristic estimate – not an AI ATS scan"
                        : "تقدير تقريبي وليس فحص ATS حقيقي"}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg shadow-sm bg-white/60 backdrop-blur-sm">
                  <div
                    ref={previewContainerRef}
                    className="flex justify-center overflow-auto max-h-[75vh] bg-white p-4"
                  >
                    <div
                      style={{
                        transform: `scale(${previewScale})`,
                        transformOrigin: "top center",
                        width: 794,
                      }}
                    >
                      <div ref={previewInnerRef}>{renderTemplate()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -100000,
          left: -100000,
          width: "794px",
          pointerEvents: "none",
        }}
      >
        <div ref={printRef}>{renderTemplate()}</div>
      </div>
    </div>
  );
}
