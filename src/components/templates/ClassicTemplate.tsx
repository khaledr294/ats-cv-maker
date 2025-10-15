import Image from "next/image";
import { Fragment } from "react";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function ClassicTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);
  const contactItems = (
    [
      data.email && {
        key: "email",
        value: data.email,
      },
      phoneDisplay && {
        key: "phone",
        value: phoneDisplay,
        dir: "ltr" as const,
        className: "whitespace-nowrap",
      },
      data.location && {
        key: "location",
        value: data.location,
      },
    ].filter(Boolean) as Array<{
      key: string;
      value: string;
      dir?: "ltr" | "rtl";
      className?: string;
    }>
  ).map((item) => ({
    ...item,
    dir: item.dir || (data.language === "ar" ? "rtl" : "ltr"),
  }));

  return (
    <div
      className={`bg-white p-8 ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <div className="flex flex-col items-center gap-4">
          {data.photoUrl && (
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-800">
              <Image
                src={data.photoUrl}
                alt={
                  data.language === "ar" ? "الصورة الشخصية" : "Profile photo"
                }
                fill
                className="object-cover"
                unoptimized
                sizes="112px"
              />
            </div>
          )}
          <h1 className="text-3xl font-serif font-bold uppercase tracking-wide">
            {data.fullName}
          </h1>
          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
              {contactItems.map((item, index) => (
                <Fragment key={item.key}>
                  {index > 0 && <span className="text-gray-400">•</span>}
                  <span dir={item.dir} className={item.className}>
                    {item.value}
                  </span>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold mb-2 uppercase border-b border-gray-400 pb-1">
            {data.language === "ar" ? "نبذة مهنية" : "Professional Summary"}
          </h2>
          <p className="text-gray-800 text-justify leading-relaxed">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold mb-2 uppercase border-b border-gray-400 pb-1">
            {data.language === "ar" ? "الخبرات" : "Experience"}
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} -{" "}
                  {exp.current
                    ? data.language === "ar"
                      ? "حتى الآن"
                      : "Present"
                    : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 italic mb-2">{exp.company}</p>
              <p className="text-gray-800 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold mb-2 uppercase border-b border-gray-400 pb-1">
            {data.language === "ar" ? "التعليم" : "Education"}
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm text-gray-600">
                  {edu.endDate || edu.startDate}
                </span>
              </div>
              <p className="text-gray-700">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold mb-2 uppercase border-b border-gray-400 pb-1">
            {data.language === "ar" ? "المهارات" : "Skills"}
          </h2>
          <p className="text-gray-800">
            {data.skills.map((s) => s.name).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
