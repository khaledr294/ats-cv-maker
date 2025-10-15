import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function CreativeTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-white flex ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: data.accentColor }}
      >
        {/* Photo */}
        <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-6 overflow-hidden relative flex items-center justify-center text-xs">
          {data.photoUrl ? (
            <Image
              src={data.photoUrl}
              alt={data.language === "ar" ? "الصورة الشخصية" : "Profile photo"}
              fill
              className="object-cover"
              unoptimized
              sizes="128px"
            />
          ) : (
            <span className="opacity-80">
              {data.language === "ar" ? "أضف صورة" : "Add Photo"}
            </span>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">
            {data.language === "ar" ? "التواصل" : "Contact"}
          </h3>
          <div className="space-y-2 text-sm">
            {data.email && <p className="break-words">📧 {data.email}</p>}
            {phoneDisplay && (
              <p dir="ltr" className="whitespace-nowrap">
                📱 {phoneDisplay}
              </p>
            )}
            {data.location && <p>📍 {data.location}</p>}
            {data.linkedin && <p>🔗 LinkedIn</p>}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">
              {data.language === "ar" ? "المهارات" : "Skills"}
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm mb-1">{skill.name}</p>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width:
                          skill.level === "expert"
                            ? "100%"
                            : skill.level === "advanced"
                            ? "80%"
                            : skill.level === "intermediate"
                            ? "60%"
                            : "40%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b-2 border-white/30 pb-2">
              {data.language === "ar" ? "اللغات" : "Languages"}
            </h3>
            <div className="space-y-1 text-sm">
              {data.languages.map((lang) => (
                <p key={lang.id}>
                  {lang.name} - {lang.proficiency}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: data.accentColor }}
          >
            {data.fullName}
          </h1>
          {data.summary && (
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          )}
        </div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: data.accentColor }}
            >
              {data.language === "ar" ? "الخبرات" : "Experience"}
            </h2>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-4 relative pl-6 border-l-2"
                style={{ borderColor: data.accentColor }}
              >
                <div
                  className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                  style={{ backgroundColor: data.accentColor }}
                ></div>
                <h3 className="text-lg font-bold">{exp.position}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.company} | {exp.startDate} -{" "}
                  {exp.current
                    ? data.language === "ar"
                      ? "حتى الآن"
                      : "Present"
                    : exp.endDate}
                </p>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: data.accentColor }}
            >
              {data.language === "ar" ? "التعليم" : "Education"}
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.institution} | {edu.endDate || edu.startDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
