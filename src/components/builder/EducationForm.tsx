"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/types/cv";

interface EducationFormProps {
  education: Education[];
  locale: "en" | "ar";
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: keyof Education,
    value: string | boolean,
  ) => void;
}

export function EducationForm({
  education,
  locale,
  onAdd,
  onRemove,
  onUpdate,
}: EducationFormProps) {
  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
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
                onClick={() => onRemove(edu.id)}
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
              onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
            />
            <Input
              placeholder={locale === "en" ? "Field of Study" : "مجال الدراسة"}
              value={edu.field}
              onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
            />
            <Input
              placeholder={locale === "en" ? "Institution Name" : "اسم المؤسسة"}
              value={edu.institution}
              onChange={(e) => onUpdate(edu.id, "institution", e.target.value)}
            />
            <Input
              placeholder={
                locale === "en" ? "Location (optional)" : "الموقع (اختياري)"
              }
              value={edu.location || ""}
              onChange={(e) => onUpdate(edu.id, "location", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="month"
                placeholder={locale === "en" ? "Start Date" : "تاريخ البداية"}
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
              />
              <Input
                type="month"
                placeholder={locale === "en" ? "End Date" : "تاريخ النهاية"}
                value={edu.endDate}
                onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
                disabled={edu.current}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={edu.current}
                onChange={(e) => onUpdate(edu.id, "current", e.target.checked)}
                className="rounded"
              />
              {locale === "en" ? "Currently studying" : "أدرس حالياً"}
            </label>
            <Input
              placeholder={
                locale === "en" ? "GPA (optional)" : "المعدل التراكمي (اختياري)"
              }
              value={edu.gpa || ""}
              onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        {locale === "en" ? "Add Education" : "إضافة تعليم"}
      </Button>
    </div>
  );
}
