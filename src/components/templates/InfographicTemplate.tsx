import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function InfographicTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);
  const isRTL = data.language === "ar";

  // Calculate skill percentages for visualization
  const getSkillPercentage = (level?: string) => {
    switch (level) {
      case "expert":
        return 100;
      case "advanced":
        return 80;
      case "intermediate":
        return 60;
      case "beginner":
        return 40;
      default:
        return 60;
    }
  };

  return (
    <div className={`bg-white ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header with Geometric Design */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${data.accentColor} 0%, transparent 50%)`,
          }}
        />
        <div className="relative p-8">
          <div className="flex items-center gap-6">
            {data.photoUrl && (
              <div
                className="relative w-28 h-28 rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 8px 32px ${data.accentColor}40` }}
              >
                <Image
                  src={data.photoUrl}
                  alt={isRTL ? "الصورة الشخصية" : "Profile photo"}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="112px"
                />
              </div>
            )}
            <div className="flex-1">
              <h1
                className="text-4xl font-black mb-2"
                style={{ color: data.accentColor }}
              >
                {data.fullName}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {data.email && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                    📧 {data.email}
                  </span>
                )}
                {phoneDisplay && (
                  <span
                    dir="ltr"
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    📱 {phoneDisplay}
                  </span>
                )}
                {data.location && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                    📍 {data.location}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded-full text-white transition hover:opacity-80"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    🌐 Portfolio
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded-full text-white transition hover:opacity-80"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    💼 LinkedIn
                  </a>
                )}
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded-full text-white transition hover:opacity-80"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    💻 GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pt-4">
        {/* Summary with Icon */}
        {data.summary && (
          <section className="mb-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shrink-0"
                style={{ backgroundColor: data.accentColor }}
              >
                👤
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-2">
                  {isRTL ? "نبذة عني" : "About Me"}
                </h2>
                <p className="text-gray-600 leading-relaxed">{data.summary}</p>
              </div>
            </div>
          </section>
        )}

        {/* Skills - Circular Progress */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: data.accentColor }}
              >
                💡
              </div>
              <h2 className="font-bold text-gray-900">
                {isRTL ? "المهارات" : "Skills"}
              </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {data.skills.slice(0, 8).map((skill) => {
                const percentage = getSkillPercentage(skill.level);
                const circumference = 2 * Math.PI * 36;
                const offset =
                  circumference - (percentage / 100) * circumference;

                return (
                  <div key={skill.id} className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke={data.accentColor}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
                        {percentage}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Experience - Timeline */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: data.accentColor }}
              >
                💼
              </div>
              <h2 className="font-bold text-gray-900">
                {isRTL ? "الخبرات" : "Experience"}
              </h2>
            </div>
            <div className={`relative ${isRTL ? "pr-6" : "pl-6"}`}>
              <div
                className={`absolute top-0 bottom-0 w-0.5 ${isRTL ? "right-0" : "left-0"}`}
                style={{ backgroundColor: data.accentColor + "40" }}
              />
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div
                      className={`absolute top-2 w-3 h-3 rounded-full ${isRTL ? "-right-[1.6rem]" : "-left-[1.6rem]"}`}
                      style={{ backgroundColor: data.accentColor }}
                    />
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {exp.position}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: data.accentColor }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: data.accentColor }}
                        >
                          {exp.startDate} —{" "}
                          {exp.current ? (isRTL ? "الآن" : "Now") : exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education - Cards */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: data.accentColor }}
              >
                🎓
              </div>
              <h2 className="font-bold text-gray-900">
                {isRTL ? "التعليم" : "Education"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl p-4 border-2"
                  style={{ borderColor: data.accentColor + "30" }}
                >
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm" style={{ color: data.accentColor }}>
                    {edu.field}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {edu.startDate} —{" "}
                    {edu.current ? (isRTL ? "الحالي" : "Present") : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages - Bars */}
        {data.languages.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: data.accentColor }}
              >
                🌍
              </div>
              <h2 className="font-bold text-gray-900">
                {isRTL ? "اللغات" : "Languages"}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.languages.map((lang) => {
                const proficiencyWidth =
                  lang.proficiency === "native"
                    ? "100%"
                    : lang.proficiency === "professional"
                      ? "85%"
                      : lang.proficiency === "conversational"
                        ? "60%"
                        : "40%";

                return (
                  <div key={lang.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">
                        {lang.name}
                      </span>
                      <span className="text-gray-500 capitalize">
                        {lang.proficiency}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: proficiencyWidth,
                          backgroundColor: data.accentColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
