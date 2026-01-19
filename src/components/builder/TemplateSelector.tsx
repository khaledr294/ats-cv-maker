"use client";

import { CVData } from "@/types/cv";
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
  templates,
} from "@/components/templates";

interface TemplateSelectorProps {
  cvData: CVData;
  displayData: CVData;
  locale: "en" | "ar";
  showSampleData: boolean;
  onTemplateChange: (templateId: string) => void;
  onColorChange: (color: string) => void;
  onToggleSampleData: (show: boolean) => void;
}

const ACCENT_COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
] as const;

export function TemplateSelector({
  cvData,
  displayData,
  locale,
  showSampleData,
  onTemplateChange,
  onColorChange,
  onToggleSampleData,
}: TemplateSelectorProps) {
  const renderTemplateThumbnail = (templateId: string) => {
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

  return (
    <div className="space-y-4">
      {/* Template Grid */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Choose a Template" : "اختر قالباً"}
        </label>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                cvData.templateId === template.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
            >
              <div className="mb-2">{renderTemplateThumbnail(template.id)}</div>
              <h3 className="font-semibold text-sm">
                {locale === "en" ? template.name : template.nameAr}
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

      {/* Accent Color */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Accent Color" : "اللون المميز"}
        </label>
        <div className="flex gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-10 h-10 rounded-full border-2 transition-transform ${
                cvData.accentColor === color
                  ? "border-gray-800 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Sample Data Toggle */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <input
          type="checkbox"
          id="showSampleData"
          checked={showSampleData}
          onChange={(e) => onToggleSampleData(e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label
          htmlFor="showSampleData"
          className="text-sm font-medium cursor-pointer"
        >
          {locale === "en"
            ? "Show sample data to preview the template"
            : "عرض بيانات توضيحية لمعاينة القالب"}
        </label>
      </div>
    </div>
  );
}
