"use client";

import { useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X, User } from "lucide-react";
import { CVData } from "@/types/cv";

interface PersonalInfoFormProps {
  cvData: CVData;
  displayData: CVData;
  locale: "en" | "ar";
  onUpdate: (updates: Partial<CVData>) => void;
}

export function PersonalInfoForm({
  cvData,
  displayData,
  locale,
  onUpdate,
}: PersonalInfoFormProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result === "string") {
        onUpdate({ photoUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onUpdate({ photoUrl: "" });
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const triggerPhotoUpload = () => {
    photoInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Full Name *" : "الاسم الكامل *"}
        </label>
        <Input
          value={cvData.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          placeholder={locale === "en" ? "John Doe" : "أحمد محمد"}
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Email *" : "البريد الإلكتروني *"}
        </label>
        <Input
          type="email"
          value={cvData.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="email@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Phone" : "الهاتف"}
        </label>
        <Input
          value={cvData.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          placeholder="+1 234 567 890"
        />
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Location" : "الموقع"}
        </label>
        <Input
          value={cvData.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder={locale === "en" ? "City, Country" : "المدينة، البلد"}
        />
      </div>

      {/* Website - NEW */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en"
            ? "Website (optional)"
            : "الموقع الإلكتروني (اختياري)"}
        </label>
        <Input
          type="url"
          value={cvData.website || ""}
          onChange={(e) => onUpdate({ website: e.target.value })}
          placeholder="https://yourwebsite.com"
        />
      </div>

      {/* LinkedIn - Optional */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "LinkedIn (optional)" : "لينكد إن (اختياري)"}
        </label>
        <Input
          type="url"
          value={cvData.linkedin || ""}
          onChange={(e) => onUpdate({ linkedin: e.target.value })}
          placeholder="https://linkedin.com/in/yourname"
        />
      </div>

      {/* GitHub - NEW */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "GitHub (optional)" : "جيت هاب (اختياري)"}
        </label>
        <Input
          type="url"
          value={cvData.github || ""}
          onChange={(e) => onUpdate({ github: e.target.value })}
          placeholder="https://github.com/yourusername"
        />
      </div>

      {/* Professional Summary */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Professional Summary" : "نبذة مهنية"}
        </label>
        <Textarea
          rows={6}
          value={cvData.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          placeholder={
            locale === "en"
              ? "Write a brief professional summary (100-200 words)..."
              : "اكتب نبذة مهنية موجزة (100-200 كلمة)..."
          }
        />
      </div>

      {/* Profile Photo - IMPROVED */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          {locale === "en" ? "Profile Photo" : "الصورة الشخصية"}
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Photo Preview */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
            {displayData.photoUrl ? (
              <>
                <Image
                  src={displayData.photoUrl}
                  alt={locale === "en" ? "Profile preview" : "معاينة الصورة"}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="96px"
                />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                  title={locale === "en" ? "Remove photo" : "إزالة الصورة"}
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex-1 space-y-3">
            {/* Hidden file input */}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              aria-label={locale === "en" ? "Upload profile photo" : "رفع الصورة الشخصية"}
            />

            {/* Styled upload button - FIXED VISIBILITY */}
            <Button
              type="button"
              onClick={triggerPhotoUpload}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            >
              <Upload className="w-4 h-4 mr-2" />
              {locale === "en" ? "Upload Photo" : "رفع صورة"}
            </Button>

            {/* URL input */}
            <Input
              type="url"
              value={
                cvData.photoUrl && cvData.photoUrl.startsWith("data:")
                  ? ""
                  : cvData.photoUrl || ""
              }
              onChange={(e) => onUpdate({ photoUrl: e.target.value })}
              placeholder={
                locale === "en"
                  ? "Or paste image URL..."
                  : "أو الصق رابط الصورة..."
              }
            />

            {cvData.photoUrl && cvData.photoUrl.startsWith("data:") && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                ✓ {locale === "en" ? "Photo uploaded" : "تم رفع الصورة"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
