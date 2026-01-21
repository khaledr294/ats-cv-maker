import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";
import Image from "next/image";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function ExecutiveTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-white ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header with colored bar */}
      <div className="h-3" style={{ backgroundColor: data.accentColor }}></div>

      <div className="p-10">
        {/* Name and Title */}
        <div className="mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
              <div className="flex flex-wrap gap-6 text-sm mt-4">
                {data.email && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: data.accentColor + "20" }}
                    >
                      <span style={{ color: data.accentColor }}>✉</span>
                    </div>
                    <span>{data.email}</span>
                  </div>
                )}
                {phoneDisplay && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: data.accentColor + "20" }}
                    >
                      <span style={{ color: data.accentColor }}>☎</span>
                    </div>
                    <span dir="ltr" className="whitespace-nowrap">
                      {phoneDisplay}
                    </span>
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: data.accentColor + "20",
                        color: data.accentColor,
                      }}
                    >
                      ⌂
                    </div>
                    <span>{data.location}</span>
                  </div>
                )}
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: data.accentColor + "20",
                        color: data.accentColor,
                      }}
                    >
                      ⊕
                    </div>
                    <span>{data.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: data.accentColor + "20",
                        color: data.accentColor,
                      }}
                    >
                      in
                    </div>
                    <span>LinkedIn</span>
                  </a>
                )}
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: data.accentColor + "20",
                        color: data.accentColor,
                      }}
                    >
                      &lt;/&gt;
                    </div>
                    <span>GitHub</span>
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

        {/* Executive Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div
                className="w-1 h-6 rounded"
                style={{ backgroundColor: data.accentColor }}
              ></div>
              {data.language === "ar" ? "الملخص التنفيذي" : "Executive Summary"}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {data.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div
                className="w-1 h-6 rounded"
                style={{ backgroundColor: data.accentColor }}
              ></div>
              {data.language === "ar"
                ? "الخبرة المهنية"
                : "Professional Experience"}
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-2 pl-6"
                  style={{ borderColor: data.accentColor + "40" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{exp.position}</h3>
                      <p
                        className="font-semibold"
                        style={{ color: data.accentColor }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <p>
                        {exp.startDate} -{" "}
                        {exp.current
                          ? data.language === "ar"
                            ? "حتى الآن"
                            : "Present"
                          : exp.endDate}
                      </p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div
                className="w-1 h-6 rounded"
                style={{ backgroundColor: data.accentColor }}
              ></div>
              {data.language === "ar"
                ? "التعليم والمؤهلات"
                : "Education & Credentials"}
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.field}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} -{" "}
                    {edu.current
                      ? data.language === "ar"
                        ? "حتى الآن"
                        : "Present"
                      : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div
                className="w-1 h-6 rounded"
                style={{ backgroundColor: data.accentColor }}
              ></div>
              {data.language === "ar"
                ? "الكفاءات الأساسية"
                : "Core Competencies"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: data.accentColor }}
                  ></div>
                  <span className="text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
