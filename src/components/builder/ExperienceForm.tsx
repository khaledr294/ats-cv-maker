"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { WorkExperience } from "@/types/cv";

interface ExperienceFormProps {
  experience: WorkExperience[];
  locale: "en" | "ar";
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean | string[],
  ) => void;
}

export function ExperienceForm({
  experience,
  locale,
  onAdd,
  onRemove,
  onUpdate,
}: ExperienceFormProps) {
  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
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
                onClick={() => onRemove(exp.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder={
                locale === "en" ? "Position/Job Title" : "المسمى الوظيفي"
              }
              value={exp.position}
              onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
            />
            <Input
              placeholder={locale === "en" ? "Company Name" : "اسم الشركة"}
              value={exp.company}
              onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
            />
            <Input
              placeholder={
                locale === "en" ? "Location (optional)" : "الموقع (اختياري)"
              }
              value={exp.location || ""}
              onChange={(e) => onUpdate(exp.id, "location", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="month"
                placeholder={locale === "en" ? "Start Date" : "تاريخ البداية"}
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
              />
              <Input
                type="month"
                placeholder={locale === "en" ? "End Date" : "تاريخ النهاية"}
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
                disabled={exp.current}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
                className="rounded"
              />
              {locale === "en" ? "I currently work here" : "أعمل هنا حالياً"}
            </label>
            <Textarea
              rows={4}
              placeholder={
                locale === "en"
                  ? "Describe your responsibilities and achievements..."
                  : "اوصف مسؤولياتك وإنجازاتك..."
              }
              value={exp.description}
              onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        {locale === "en" ? "Add Experience" : "إضافة خبرة"}
      </Button>
    </div>
  );
}
