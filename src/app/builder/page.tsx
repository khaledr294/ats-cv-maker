"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Eye, Globe, Plus, Trash2 } from "lucide-react";
import { CVData, WorkExperience, Education, Skill } from "@/types/cv";
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
  templates,
} from "@/components/templates";
import { ATSScoreCard } from "@/components/ATSScoreCard";
import { calculateATSScore } from "@/lib/ats-analyzer";
import { exportToPDF } from "@/lib/export";
import { mergeWithSampleData } from "@/lib/sample-data";
import { toast } from "sonner";

const LOCALE_STORAGE_KEY = "cv-maker:locale";

export default function BuilderPage() {
  const [locale, setLocale] = useState<"en" | "ar">("ar");
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
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const displayData = useMemo(
    () => mergeWithSampleData(cvData, locale),
    [cvData, locale]
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

  useEffect(() => {
    return () => {
      if (exportMenuTimeoutRef.current) {
        clearTimeout(exportMenuTimeoutRef.current);
      }
    };
  }, []);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result === "string") {
        setCVData((prev) => ({ ...prev, photoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setCVData((prev) => ({ ...prev, photoUrl: "" }));
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const openExportMenu = () => {
    if (exportMenuTimeoutRef.current) {
      clearTimeout(exportMenuTimeoutRef.current);
    }
    setIsExportMenuOpen(true);
  };

  const scheduleCloseExportMenu = () => {
    if (exportMenuTimeoutRef.current) {
      clearTimeout(exportMenuTimeoutRef.current);
    }
    exportMenuTimeoutRef.current = setTimeout(() => {
      setIsExportMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = previewContainerRef.current;
    if (!container) return;

    const TEMPLATE_WIDTH = 794;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      if (!availableWidth) return;
      const nextScale = Math.min(1, availableWidth / TEMPLATE_WIDTH);
      setPreviewScale(
        Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1
      );
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => updateScale());
    resizeObserver.observe(container);
    window.addEventListener("resize", updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [displayData.templateId]);

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
    const exportElement = printRef.current || previewInnerRef.current;
    if (!exportElement) {
      toast.error(
        locale === "en"
          ? "Preview is not ready yet"
          : "المعاينة غير جاهزة حالياً"
      );
      return;
    }
    try {
      const exportScale = printRef.current ? 2 : Math.max(2, 2 / previewScale);
      await exportToPDF({
        element: exportElement,
        cvData: displayData,
        scale: exportScale,
      });
      toast.success(
        locale === "en" ? "PDF exported successfully!" : "تم تصدير PDF بنجاح!"
      );
    } catch {
      toast.error(locale === "en" ? "Failed to export PDF" : "فشل تصدير PDF");
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
    value: string | boolean | string[]
  ) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
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
    value: string | boolean
  ) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
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
        skill.id === id ? { ...skill, [field]: value } : skill
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
      }[displayData.templateId] || ModernTemplate;

    return (
      <TemplateComponent
        data={displayData}
        className="w-[794px] min-h-[1123px] mx-auto"
      />
    );
  };

  const renderTemplateThumbnail = (templateId: string) => {
    const TemplateComponent =
      {
        modern: ModernTemplate,
        classic: ClassicTemplate,
        creative: CreativeTemplate,
        minimal: MinimalTemplate,
        executive: ExecutiveTemplate,
      }[templateId] || ModernTemplate;

    const thumbnailData = {
      ...displayData,
      templateId,
    };

    const SCALE = 0.23;
    const ORIGINAL_WIDTH = 794;
    const ORIGINAL_HEIGHT = 1123;

    return (
      <div
        className="relative overflow-hidden rounded-md border bg-white pointer-events-none select-none"
        style={{
          height: ORIGINAL_HEIGHT * SCALE,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: ORIGINAL_WIDTH,
            height: ORIGINAL_HEIGHT,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        >
          <TemplateComponent
            data={thumbnailData}
            className="w-[794px] min-h-[1123px]"
          />
        </div>
      </div>
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
            <div
              className="relative"
              onMouseEnter={openExportMenu}
              onMouseLeave={scheduleCloseExportMenu}
              onFocus={openExportMenu}
              onBlur={scheduleCloseExportMenu}
            >
              <Button
                size="sm"
                type="button"
                onClick={() =>
                  setIsExportMenuOpen((prev) => {
                    if (exportMenuTimeoutRef.current) {
                      clearTimeout(exportMenuTimeoutRef.current);
                    }
                    return !prev;
                  })
                }
                aria-haspopup="menu"
                aria-expanded={isExportMenuOpen}
              >
                <Download className="w-4 h-4 mr-2" />
                {locale === "en" ? "Export" : "تصدير"}
              </Button>
              <div
                className={`absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg transition-opacity duration-150 ${
                  isExportMenuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onMouseEnter={openExportMenu}
                onMouseLeave={scheduleCloseExportMenu}
              >
                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
                >
                  📄 Export PDF
                </button>
              </div>
            </div>
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
                aria-label={`${locale === "ar" ? "الخطوة" : "Step"} ${index + 1}: ${step}`}
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
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Choose a Template" : "اختر قالباً"}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() =>
                              setCVData({ ...cvData, templateId: template.id })
                            }
                            className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                              cvData.templateId === template.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="mb-2">
                              {renderTemplateThumbnail(template.id)}
                            </div>
                            <h3 className="font-semibold text-sm">
                              {locale === "en"
                                ? template.name
                                : template.nameAr}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {locale === "en"
                                ? template.description
                                : template.descriptionAr}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Accent Color" : "اللون المميز"}
                      </label>
                      <div className="flex gap-2">
                        {(
                          [
                            "#3B82F6",
                            "#EF4444",
                            "#10B981",
                            "#F59E0B",
                            "#8B5CF6",
                            "#EC4899",
                          ] as const
                        ).map((color) => (
                          <button
                            key={color}
                            onClick={() =>
                              setCVData({ ...cvData, accentColor: color })
                            }
                            className={`w-10 h-10 rounded-full border-2 ${
                              cvData.accentColor === color
                                ? "border-gray-800 scale-110"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Full Name *" : "الاسم الكامل *"}
                      </label>
                      <Input
                        value={cvData.fullName}
                        onChange={(e) =>
                          setCVData({ ...cvData, fullName: e.target.value })
                        }
                        placeholder={locale === "en" ? "John Doe" : "أحمد محمد"}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Email *" : "البريد الإلكتروني *"}
                      </label>
                      <Input
                        type="email"
                        value={cvData.email}
                        onChange={(e) =>
                          setCVData({ ...cvData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Phone" : "الهاتف"}
                      </label>
                      <Input
                        value={cvData.phone}
                        onChange={(e) =>
                          setCVData({ ...cvData, phone: e.target.value })
                        }
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Location" : "الموقع"}
                      </label>
                      <Input
                        value={cvData.location}
                        onChange={(e) =>
                          setCVData({ ...cvData, location: e.target.value })
                        }
                        placeholder={
                          locale === "en" ? "City, Country" : "المدينة، البلد"
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "LinkedIn URL" : "رابط LinkedIn"}
                      </label>
                      <Input
                        value={cvData.linkedin}
                        onChange={(e) =>
                          setCVData({ ...cvData, linkedin: e.target.value })
                        }
                        placeholder="https://linkedin.com/in/yourname"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en"
                          ? "Professional Summary"
                          : "نبذة مهنية"}
                      </label>
                      <Textarea
                        rows={6}
                        value={cvData.summary}
                        onChange={(e) =>
                          setCVData({ ...cvData, summary: e.target.value })
                        }
                        placeholder={
                          locale === "en"
                            ? "Write a brief professional summary (100-200 words)..."
                            : "اكتب نبذة مهنية موجزة (100-200 كلمة)..."
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {locale === "en" ? "Profile Photo" : "الصورة الشخصية"}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          {displayData.photoUrl ? (
                            <Image
                              src={displayData.photoUrl}
                              alt={
                                locale === "en"
                                  ? "Profile preview"
                                  : "معاينة الصورة"
                              }
                              fill
                              className="object-cover"
                              unoptimized
                              sizes="96px"
                            />
                          ) : (
                            <span>
                              {locale === "en" ? "No photo" : "لا توجد صورة"}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <Input
                            ref={photoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                          />
                          <Input
                            type="url"
                            value={
                              cvData.photoUrl &&
                              cvData.photoUrl.startsWith("data:")
                                ? ""
                                : cvData.photoUrl || ""
                            }
                            onChange={(e) =>
                              setCVData((prev) => ({
                                ...prev,
                                photoUrl: e.target.value,
                              }))
                            }
                            placeholder={
                              locale === "en"
                                ? "https://example.com/photo.jpg"
                                : "https://example.com/photo.jpg"
                            }
                          />
                          {cvData.photoUrl &&
                            cvData.photoUrl.startsWith("data:") && (
                              <p className="text-xs text-muted-foreground">
                                {locale === "en"
                                  ? "Using uploaded photo"
                                  : "يتم استخدام الصورة المرفوعة"}
                              </p>
                            )}
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemovePhoto}
                              disabled={!cvData.photoUrl}
                            >
                              {locale === "en" ? "Remove" : "إزالة"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Experience */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    {cvData.experience.map((exp, index) => (
                      <Card key={exp.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">
                              {locale === "en"
                                ? `Experience #${index + 1}`
                                : `الخبرة رقم ${index + 1}`}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Input
                            placeholder={
                              locale === "en"
                                ? "Position/Job Title"
                                : "المسمى الوظيفي"
                            }
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "position",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder={
                              locale === "en" ? "Company Name" : "اسم الشركة"
                            }
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value
                              )
                            }
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="month"
                              placeholder={
                                locale === "en" ? "Start Date" : "تاريخ البداية"
                              }
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              type="month"
                              placeholder={
                                locale === "en" ? "End Date" : "تاريخ النهاية"
                              }
                              value={exp.endDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              disabled={exp.current}
                            />
                          </div>
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "current",
                                  e.target.checked
                                )
                              }
                              className="rounded"
                            />
                            {locale === "en"
                              ? "I currently work here"
                              : "أعمل هنا حالياً"}
                          </label>
                          <Textarea
                            rows={4}
                            placeholder={
                              locale === "en"
                                ? "Describe your responsibilities and achievements..."
                                : "اوصف مسؤولياتك وإنجازاتك..."
                            }
                            value={exp.description}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      onClick={addExperience}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {locale === "en" ? "Add Experience" : "إضافة خبرة"}
                    </Button>
                  </div>
                )}

                {/* Step 3: Education */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    {cvData.education.map((edu, index) => (
                      <Card key={edu.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">
                              {locale === "en"
                                ? `Education #${index + 1}`
                                : `التعليم رقم ${index + 1}`}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Input
                            placeholder={
                              locale === "en"
                                ? "Degree (e.g., Bachelor of Science)"
                                : "الدرجة (مثل: بكالوريوس علوم)"
                            }
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                          />
                          <Input
                            placeholder={
                              locale === "en"
                                ? "Field of Study"
                                : "مجال الدراسة"
                            }
                            value={edu.field}
                            onChange={(e) =>
                              updateEducation(edu.id, "field", e.target.value)
                            }
                          />
                          <Input
                            placeholder={
                              locale === "en"
                                ? "Institution Name"
                                : "اسم المؤسسة"
                            }
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "institution",
                                e.target.value
                              )
                            }
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="month"
                              placeholder={
                                locale === "en" ? "Start Date" : "تاريخ البداية"
                              }
                              value={edu.startDate}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              type="month"
                              placeholder={
                                locale === "en" ? "End Date" : "تاريخ النهاية"
                              }
                              value={edu.endDate}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              disabled={edu.current}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      onClick={addEducation}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {locale === "en" ? "Add Education" : "إضافة تعليم"}
                    </Button>
                  </div>
                )}

                {/* Step 4: Skills */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    {cvData.skills.map((skill) => (
                      <div key={skill.id} className="flex gap-2">
                        <Input
                          placeholder={
                            locale === "en" ? "Skill name" : "اسم المهارة"
                          }
                          value={skill.name}
                          onChange={(e) =>
                            updateSkill(skill.id, "name", e.target.value)
                          }
                          className="flex-1"
                        />
                        <select
                          value={skill.level}
                          onChange={(e) =>
                            updateSkill(skill.id, "level", e.target.value)
                          }
                          className="px-3 py-2 border rounded-md"
                        >
                          <option value="beginner">
                            {locale === "en" ? "Beginner" : "مبتدئ"}
                          </option>
                          <option value="intermediate">
                            {locale === "en" ? "Intermediate" : "متوسط"}
                          </option>
                          <option value="advanced">
                            {locale === "en" ? "Advanced" : "متقدم"}
                          </option>
                          <option value="expert">
                            {locale === "en" ? "Expert" : "خبير"}
                          </option>
                        </select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={addSkill}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {locale === "en" ? "Add Skill" : "إضافة مهارة"}
                    </Button>
                  </div>
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
                        Math.min(steps.length - 1, currentStep + 1)
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
