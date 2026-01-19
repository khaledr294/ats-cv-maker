"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Skill } from "@/types/cv";

interface SkillsFormProps {
  skills: Skill[];
  locale: "en" | "ar";
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Skill, value: string) => void;
}

export function SkillsForm({
  skills,
  locale,
  onAdd,
  onRemove,
  onUpdate,
}: SkillsFormProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex gap-2">
          <Input
            placeholder={locale === "en" ? "Skill name" : "اسم المهارة"}
            value={skill.name}
            onChange={(e) => onUpdate(skill.id, "name", e.target.value)}
            className="flex-1"
          />
          <select
            value={skill.level}
            onChange={(e) => onUpdate(skill.id, "level", e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
            aria-label={locale === "en" ? "Skill level" : "مستوى المهارة"}
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
          <Button variant="ghost" size="sm" onClick={() => onRemove(skill.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button onClick={onAdd} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        {locale === "en" ? "Add Skill" : "إضافة مهارة"}
      </Button>
    </div>
  );
}
