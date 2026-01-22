"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Language } from "@/types/cv";

interface LanguagesFormProps {
  languages: Language[];
  locale: "en" | "ar";
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Language, value: string) => void;
}

export function LanguagesForm({
  languages,
  locale,
  onAdd,
  onRemove,
  onUpdate,
}: LanguagesFormProps) {
  const proficiencyLabels = {
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        {locale === "en"
          ? "Add the languages you speak and your proficiency level."
          : "أضف اللغات التي تتحدثها ومستوى إتقانك لها."}
      </p>
      
      {languages.map((lang) => (
        <div key={lang.id} className="flex gap-2 items-center">
          <Input
            placeholder={locale === "en" ? "Language name" : "اسم اللغة"}
            value={lang.name}
            onChange={(e) => onUpdate(lang.id, "name", e.target.value)}
            className="flex-1"
          />
          <select
            value={lang.proficiency}
            onChange={(e) => onUpdate(lang.id, "proficiency", e.target.value)}
            className="px-3 py-2 border rounded-md bg-background min-w-[140px]"
            aria-label={locale === "en" ? "Proficiency level" : "مستوى الإتقان"}
          >
            <option value="basic">{proficiencyLabels[locale].basic}</option>
            <option value="conversational">
              {proficiencyLabels[locale].conversational}
            </option>
            <option value="professional">
              {proficiencyLabels[locale].professional}
            </option>
            <option value="native">{proficiencyLabels[locale].native}</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(lang.id)}
            aria-label={locale === "en" ? "Remove language" : "حذف اللغة"}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      
      <Button onClick={onAdd} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        {locale === "en" ? "Add Language" : "إضافة لغة"}
      </Button>
    </div>
  );
}
