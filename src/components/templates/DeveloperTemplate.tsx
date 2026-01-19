import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function DeveloperTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-gray-900 text-gray-100 ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Terminal-style Header */}
      <div
        className="p-6"
        style={{ backgroundColor: data.accentColor }}
      >
        <div className="flex items-center gap-6">
          {data.photoUrl && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white/30">
              <Image
                src={data.photoUrl}
                alt={data.language === "ar" ? "الصورة الشخصية" : "Profile photo"}
                fill
                className="object-cover"
                unoptimized
                sizes="80px"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-mono font-bold text-white">
              {data.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/80 mt-2 font-mono">
              {data.email && <span>📧 {data.email}</span>}
              {phoneDisplay && (
                <span dir="ltr" className="whitespace-nowrap">
                  📱 {phoneDisplay}
                </span>
              )}
              {data.location && <span>📍 {data.location}</span>}
            </div>
          </div>
        </div>
        
        {/* Social Links - Developer Style */}
        <div className="flex flex-wrap gap-4 mt-4 font-mono text-sm">
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
            >
              🌐 Portfolio
            </a>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
            >
              💻 GitHub
            </a>
          )}
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
            >
              💼 LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Bio - Terminal Style */}
        {data.summary && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "cat about.txt" : "cat about.txt"}
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
              {data.summary}
            </p>
          </section>
        )}

        {/* Skills - Tech Stack */}
        {data.skills.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "ls ./tech-stack" : "ls ./tech-stack"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-4">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 rounded font-mono text-sm"
                  style={{
                    backgroundColor: data.accentColor + "30",
                    color: data.accentColor,
                    border: `1px solid ${data.accentColor}50`,
                  }}
                >
                  {skill.name}
                  {skill.level === "expert" && " ⭐"}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "git log --experience" : "git log --experience"}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white font-mono">{exp.position}</h3>
                      <p className="text-gray-400 font-mono text-sm">@ {exp.company}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-gray-800 rounded text-gray-400">
                      {exp.startDate} → {exp.current ? "HEAD" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "ls ./projects" : "ls ./projects"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <h3 className="font-mono font-bold text-white flex items-center gap-2">
                    📁 {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "cat education.md" : "cat education.md"}
              </h2>
            </div>
            <div className="space-y-3 pl-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white">{edu.degree} - {edu.field}</h3>
                    <p className="text-gray-400 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold" style={{ color: data.accentColor }}>
                {data.language === "ar" ? "echo $LANGUAGES" : "echo $LANGUAGES"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-4">
              {data.languages.map((lang) => (
                <span
                  key={lang.id}
                  className="px-3 py-1 bg-gray-800 rounded font-mono text-sm text-gray-300"
                >
                  {lang.name}: {lang.proficiency}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
