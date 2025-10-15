import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function MinimalTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-white p-10 ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light mb-4 tracking-tight">
          {data.fullName}
        </h1>
        <div className="flex gap-4 text-sm text-gray-600 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {phoneDisplay && (
            <span dir="ltr" className="whitespace-nowrap">
              {phoneDisplay}
            </span>
          )}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-800 leading-relaxed text-lg font-light">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest font-semibold mb-4 text-gray-500">
            {data.language === "ar" ? "الخبرات" : "Experience"}
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} —{" "}
                    {exp.current
                      ? data.language === "ar"
                        ? "الآن"
                        : "Now"
                      : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-gray-700 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest font-semibold mb-4 text-gray-500">
            {data.language === "ar" ? "التعليم" : "Education"}
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">
                    {edu.degree}, {edu.field}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {edu.endDate || edu.startDate}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-widest font-semibold mb-4 text-gray-500">
            {data.language === "ar" ? "المهارات" : "Skills"}
          </h2>
          <p className="text-gray-700 font-light leading-relaxed">
            {data.skills.map((s) => s.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
