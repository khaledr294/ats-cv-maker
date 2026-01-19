import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function TwoColumnTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);
  const isRTL = data.language === "ar";

  return (
    <div
      className={`bg-white ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div
        className="p-6 text-white"
        style={{ backgroundColor: data.accentColor }}
      >
        <div className="flex items-center gap-6">
          {data.photoUrl && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
              <Image
                src={data.photoUrl}
                alt={isRTL ? "الصورة الشخصية" : "Profile photo"}
                fill
                className="object-cover"
                unoptimized
                sizes="96px"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/90">
              {data.email && <span>📧 {data.email}</span>}
              {phoneDisplay && (
                <span dir="ltr" className="whitespace-nowrap">
                  📱 {phoneDisplay}
                </span>
              )}
              {data.location && <span>📍 {data.location}</span>}
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-sm">
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  🌐 {data.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  💼 LinkedIn
                </a>
              )}
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  💻 GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex">
        {/* Left Column - 40% */}
        <div className="w-2/5 bg-gray-50 p-6 min-h-[600px]">
          {/* Summary */}
          {data.summary && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "نبذة مهنية" : "Profile"}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "المهارات" : "Skills"}
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 flex-1">{skill.name}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: data.accentColor,
                          width:
                            skill.level === "expert"
                              ? "100%"
                              : skill.level === "advanced"
                                ? "80%"
                                : skill.level === "intermediate"
                                  ? "60%"
                                  : "40%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "اللغات" : "Languages"}
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-500 capitalize">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "الشهادات" : "Certifications"}
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <p className="font-medium text-gray-800">{cert.name}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - 60% */}
        <div className="w-3/5 p-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "الخبرات العملية" : "Work Experience"}
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-sm" style={{ color: data.accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {exp.startDate} — {exp.current ? (isRTL ? "الحالي" : "Present") : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm whitespace-pre-line mt-2">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "التعليم" : "Education"}
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree} - {edu.field}</h3>
                      <p className="text-sm" style={{ color: data.accentColor }}>
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {edu.startDate} — {edu.current ? (isRTL ? "الحالي" : "Present") : edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {isRTL ? "المشاريع" : "Projects"}
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
