import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function ModernTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-white p-8 shadow-lg ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className="border-b-4 pb-6 mb-6"
        style={{ borderColor: data.accentColor }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: data.accentColor }}
            >
              {data.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.email && <span>📧 {data.email}</span>}
              {phoneDisplay && (
                <span dir="ltr" className="whitespace-nowrap">
                  📱 {phoneDisplay}
                </span>
              )}
              {data.location && <span>📍 {data.location}</span>}
              {data.website && (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  🌐 {data.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  💼 LinkedIn
                </a>
              )}
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </div>
          {data.photoUrl && (
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-4"
              style={{ borderColor: data.accentColor }}
            >
              <Image
                src={data.photoUrl}
                alt={
                  data.language === "ar" ? "الصورة الشخصية" : "Profile photo"
                }
                fill
                className="object-cover"
                unoptimized
                sizes="96px"
              />
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: data.accentColor }}
          >
            {data.language === "ar" ? "نبذة مهنية" : "Professional Summary"}
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: data.accentColor }}
          >
            {data.language === "ar" ? "الخبرات العملية" : "Work Experience"}
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <p className="text-gray-600 mb-2">
                {exp.company} | {exp.startDate} -{" "}
                {exp.current
                  ? data.language === "ar"
                    ? "حتى الآن"
                    : "Present"
                  : exp.endDate}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: data.accentColor }}
          >
            {data.language === "ar" ? "التعليم" : "Education"}
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="text-lg font-semibold">
                {edu.degree} in {edu.field}
              </h3>
              <p className="text-gray-600">
                {edu.institution} | {edu.startDate} -{" "}
                {edu.current
                  ? data.language === "ar"
                    ? "حتى الآن"
                    : "Present"
                  : edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: data.accentColor }}
          >
            {data.language === "ar" ? "المهارات" : "Skills"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: data.accentColor }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
