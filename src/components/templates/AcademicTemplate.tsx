import Image from "next/image";
import { CVData } from "@/types/cv";
import { formatPhoneDisplay } from "@/lib/utils";

interface TemplateProps {
  data: CVData;
  className?: string;
}

export function AcademicTemplate({ data, className = "" }: TemplateProps) {
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <div
      className={`bg-white p-10 ${className}`}
      dir={data.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header - Academic Style */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <div className="flex flex-col items-center gap-4">
          {data.photoUrl && (
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200">
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
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              {data.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="hover:text-gray-900"
                >
                  {data.email}
                </a>
              )}
              {phoneDisplay && (
                <span dir="ltr" className="whitespace-nowrap">
                  {phoneDisplay}
                </span>
              )}
              {data.location && <span>{data.location}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              {data.website && (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {data.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Research Interests / Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar"
              ? "الاهتمامات البحثية"
              : "Research Interests"}
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {/* Education - Primary for Academic */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar" ? "التعليم" : "Education"}
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} {data.language === "ar" ? "في" : "in"}{" "}
                    {edu.field}
                  </h3>
                  <p className="text-gray-700 italic">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">
                      {data.language === "ar" ? "المعدل:" : "GPA:"} {edu.gpa}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.startDate} —{" "}
                  {edu.current
                    ? data.language === "ar"
                      ? "الحالي"
                      : "Present"
                    : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience - Academic Positions */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar"
              ? "الخبرة الأكاديمية"
              : "Academic Experience"}
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate} —{" "}
                    {exp.current
                      ? data.language === "ar"
                        ? "الحالي"
                        : "Present"
                      : exp.endDate}
                  </div>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-line mt-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects - Publications/Research */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar"
              ? "المنشورات والأبحاث"
              : "Publications & Research"}
          </h2>
          <ul className="space-y-3">
            {data.projects.map((project) => (
              <li key={project.id} className="text-gray-700">
                <span className="font-medium">{project.name}</span>
                {project.description && (
                  <span className="text-gray-600">
                    {" "}
                    — {project.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills - Technical Expertise */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar" ? "المهارات التقنية" : "Technical Skills"}
          </h2>
          <p className="text-gray-700">
            {data.skills.map((s) => s.name).join(" • ")}
          </p>
        </section>
      )}

      {/* Certifications - Awards & Honors */}
      {data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar" ? "الجوائز والتكريمات" : "Awards & Honors"}
          </h2>
          <ul className="space-y-2">
            {data.certifications.map((cert) => (
              <li key={cert.id} className="text-gray-700">
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && (
                  <span className="text-gray-600"> — {cert.issuer}</span>
                )}
                {cert.date && (
                  <span className="text-gray-500 text-sm"> ({cert.date})</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2">
            {data.language === "ar" ? "اللغات" : "Languages"}
          </h2>
          <p className="text-gray-700">
            {data.languages
              .map((l) => `${l.name} (${l.proficiency})`)
              .join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}
