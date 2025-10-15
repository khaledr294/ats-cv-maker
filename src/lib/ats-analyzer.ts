import { CVData, ATSScore } from "@/types/cv";

export function calculateATSScore(cvData: CVData): ATSScore {
  const language: "en" | "ar" = cvData.language === "ar" ? "ar" : "en";

  const categories = {
    formatting: analyzeFormatting(cvData, language),
    keywords: analyzeKeywords(cvData, language),
    content: analyzeContent(cvData, language),
    structure: analyzeStructure(cvData, language),
  };

  const overall = Math.round(
    (categories.formatting.score +
      categories.keywords.score +
      categories.content.score +
      categories.structure.score) /
      4
  );

  const recommendations = generateRecommendations(categories, language);

  return {
    overall,
    categories,
    recommendations,
  };
}

function analyzeFormatting(
  cvData: CVData,
  language: "en" | "ar"
): {
  score: number;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 100;
  const msg = (en: string, ar: string) => (language === "ar" ? ar : en);

  const nameParts = cvData.fullName.trim().split(/\s+/);
  if (nameParts.length < 2) {
    issues.push(
      msg(
        "Include at least a first and last name for professional formatting",
        "أضف الاسم الأول واسم العائلة لإظهار احترافية أكبر"
      )
    );
    score -= 10;
  }

  if (/[A-Za-z]/.test(cvData.fullName)) {
    const improperCapitalization = nameParts.some(
      (part) => part[0] && part[0] === part[0].toLowerCase()
    );
    if (improperCapitalization) {
      issues.push(
        msg(
          "Capitalize your name consistently (e.g., John Doe)",
          "احرص على كتابة اسمك بأحرف كبيرة في بدايته (مثل: محمد الأحمد)"
        )
      );
      score -= 5;
    }
  }

  // Check for special characters in name
  if (/[^a-zA-Z\s\u0600-\u06FF]/.test(cvData.fullName)) {
    issues.push(
      msg(
        "Avoid special characters in your name",
        "تجنب استخدام رموز خاصة داخل الاسم"
      )
    );
    score -= 10;
  }

  // Check for proper email format
  if (!cvData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email)) {
    issues.push(
      msg(
        "Include a valid professional email address",
        "أضف بريداً إلكترونياً مهنياً صالحاً"
      )
    );
    score -= 15;
  }

  // Check for phone number
  if (!cvData.phone) {
    issues.push(
      msg(
        "Add your phone number for better contact options",
        "أضف رقم هاتفك لتسهيل التواصل"
      )
    );
    score -= 10;
  }

  if (!cvData.location) {
    issues.push(
      msg(
        "Add your city and country to optimize recruiter searches",
        "اذكر مدينتك ودولتك لزيادة ظهورك في نتائج التوظيف"
      )
    );
    score -= 8;
  }

  return { score: Math.max(0, score), issues };
}

function analyzeKeywords(
  cvData: CVData,
  language: "en" | "ar"
): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  const msg = (en: string, ar: string) => (language === "ar" ? ar : en);

  // Check for summary keyword coverage
  if (!cvData.summary || cvData.summary.trim().length === 0) {
    issues.push(
      msg(
        "Add a professional summary that introduces your core strengths",
        "أضف ملخصاً مهنياً يبرز نقاط قوتك الأساسية"
      )
    );
    score -= 20;
  }

  // Check for action verbs in experience
  const actionVerbs = [
    "achieved",
    "improved",
    "developed",
    "led",
    "managed",
    "created",
    "implemented",
    "designed",
    "increased",
    "reduced",
    "optimized",
    "حقق",
    "طور",
    "قاد",
    "أدار",
    "أنشأ",
    "نفذ",
    "صمم",
    "زاد",
    "قلل",
  ];

  const actionVerbSources = [
    ...cvData.experience.map((exp) => exp.description),
    ...cvData.experience.flatMap((exp) => exp.achievements || []),
    cvData.summary || "",
  ];

  const hasActionVerbs = actionVerbSources.some((chunk) =>
    actionVerbs.some((verb) => chunk.toLowerCase().includes(verb.toLowerCase()))
  );

  if (!hasActionVerbs) {
    issues.push(
      msg(
        "Use strong action verbs in your experience descriptions",
        "استخدم أفعالاً قوية في وصف خبراتك العملية"
      )
    );
    score -= 15;
  }

  // Check for quantifiable achievements
  const hasNumbers = actionVerbSources.some((chunk) =>
    /\d+%|\d+\+|[$€£]\d+|\b\d{2,}\b/.test(chunk)
  );

  if (!hasNumbers) {
    issues.push(
      msg(
        "Include quantifiable achievements (percentages, numbers, metrics)",
        "أضف إنجازات قابلة للقياس (نسب مئوية، أرقام، مؤشرات)"
      )
    );
    score -= 20;
  }

  // Check skills count
  if (cvData.skills.length < 5) {
    issues.push(
      msg(
        "Add at least 5-10 relevant skills for better keyword matching",
        "أضف من 5 إلى 10 مهارات ذات صلة لتحسين توافق الكلمات المفتاحية"
      )
    );
    score -= 15;
  }

  const narrativeSections = [
    cvData.summary,
    ...cvData.experience.map(
      (exp) =>
        `${exp.position} ${exp.company} ${exp.description} ${(
          exp.achievements || []
        ).join(" ")}`
    ),
    ...cvData.projects.map(
      (project) => `${project.name} ${project.description || ""}`
    ),
    ...cvData.education.map(
      (edu) => `${edu.degree} ${edu.field} ${edu.description || ""}`
    ),
    ...cvData.certifications.map((cert) => `${cert.name} ${cert.issuer}`),
  ].filter(Boolean);

  const aggregatedText = narrativeSections
    .concat(cvData.projects.flatMap((project) => project.technologies || []))
    .join(" ")
    .toLowerCase();

  const narrativeText = narrativeSections.join(" ").toLowerCase();

  const normalizedSkills = cvData.skills.map((skill) =>
    skill.name.toLowerCase()
  );
  if (normalizedSkills.length >= 3) {
    const matchedSkills = normalizedSkills.filter((skill) =>
      aggregatedText.includes(skill)
    );

    if (matchedSkills.length / normalizedSkills.length < 0.6) {
      issues.push(
        msg(
          "Reference your listed skills within your summary, experience, or projects",
          "اذكر المهارات التي أضفتها داخل الملخص أو الخبرات أو المشاريع"
        )
      );
      score -= 15;
    }

    if (cvData.summary) {
      const summarySkillMatches = normalizedSkills.filter((skill) =>
        cvData.summary!.toLowerCase().includes(skill)
      );

      if (summarySkillMatches.length < Math.min(2, normalizedSkills.length)) {
        issues.push(
          msg(
            "Blend 2-3 core skills into your professional summary",
            "ادمج مهارتين إلى ثلاث مهارات أساسية داخل الملخص المهني"
          )
        );
        score -= 8;
      }
    }
  }

  const uniqueTechnologies = new Set(
    cvData.projects.flatMap((project) =>
      (project.technologies || []).map((tech) => tech.toLowerCase())
    )
  );

  if (uniqueTechnologies.size > 0) {
    const mentionedTech = Array.from(uniqueTechnologies).filter((tech) =>
      narrativeText.includes(tech)
    );

    if (mentionedTech.length / uniqueTechnologies.size < 0.5) {
      issues.push(
        msg(
          "Highlight project technologies inside descriptions to boost keyword matches",
          "ابرز التقنيات المستخدمة في المشاريع داخل الوصف لزيادة تطابق الكلمات المفتاحية"
        )
      );
      score -= 10;
    }
  }

  const skillCategories = new Set(
    cvData.skills
      .map((skill) => skill.category)
      .filter((category): category is string => Boolean(category))
  );

  if (cvData.skills.length >= 6 && skillCategories.size < 2) {
    issues.push(
      msg(
        "Group skills into multiple categories (e.g., Technical, Soft)",
        "قسّم المهارات إلى أكثر من فئة (مثل: تقنية، شخصية)"
      )
    );
    score -= 5;
  }

  return { score: Math.max(0, score), issues };
}

function analyzeContent(
  cvData: CVData,
  language: "en" | "ar"
): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  const msg = (en: string, ar: string) => (language === "ar" ? ar : en);

  // Check for work experience
  if (cvData.experience.length === 0) {
    issues.push(
      msg(
        "Add your work experience with detailed descriptions",
        "أضف خبراتك العملية مع وصف تفصيلي"
      )
    );
    score -= 30;
  } else {
    // Check experience descriptions
    cvData.experience.forEach((exp, index) => {
      if (!exp.description || exp.description.length < 50) {
        issues.push(
          msg(
            `Experience #${index + 1}: Add detailed description (100+ words)`,
            `الخبرة #${index + 1}: أضف وصفاً مفصلاً (أكثر من 100 كلمة)`
          )
        );
        score -= 10;
      }

      if (!exp.achievements || exp.achievements.length === 0) {
        issues.push(
          msg(
            `Experience #${index + 1}: Add 2-3 achievement bullets for clarity`,
            `الخبرة #${index + 1}: أضف 2-3 نقاط إنجاز لزيادة الوضوح`
          )
        );
        score -= 8;
      } else {
        const shortAchievements = exp.achievements.filter(
          (achievement) => achievement.trim().length < 40
        );

        if (shortAchievements.length === exp.achievements.length) {
          issues.push(
            msg(
              `Experience #${
                index + 1
              }: Expand bullet points with impact and metrics`,
              `الخبرة #${index + 1}: وسّع النقاط لتتضمن الأثر والأرقام`
            )
          );
          score -= 5;
        }
      }
    });
  }

  // Check for education
  if (cvData.education.length === 0) {
    issues.push(
      msg("Add your educational background", "أضف بياناتك التعليمية")
    );
    score -= 20;
  } else {
    cvData.education.forEach((edu, index) => {
      if (!edu.degree || !edu.field) {
        issues.push(
          msg(
            `Education #${index + 1}: Specify your degree and field of study`,
            `التعليم #${index + 1}: حدّد الدرجة العلمية والتخصص`
          )
        );
        score -= 6;
      }

      if (edu.description && edu.description.length < 40) {
        issues.push(
          msg(
            `Education #${
              index + 1
            }: Add coursework, honors, or activities (40+ characters)`,
            `التعليم #${
              index + 1
            }: أضف مقررات أو إنجازات أو نشاطات (أكثر من 40 حرفاً)`
          )
        );
        score -= 4;
      }
    });
  }

  // Check for certifications or projects
  if (cvData.certifications.length === 0 && cvData.projects.length === 0) {
    issues.push(
      msg(
        "Add certifications or projects to stand out",
        "أضف شهادات أو مشاريع لتمييز سيرتك الذاتية"
      )
    );
    score -= 10;
  } else {
    cvData.projects.forEach((project, index) => {
      if (!project.description || project.description.length < 40) {
        issues.push(
          msg(
            `Project #${index + 1}: Add a concise description (40+ characters)`,
            `المشروع #${index + 1}: أضف وصفاً موجزاً (أكثر من 40 حرفاً)`
          )
        );
        score -= 5;
      }

      if (!project.technologies || project.technologies.length === 0) {
        issues.push(
          msg(
            `Project #${index + 1}: List key technologies or tools used`,
            `المشروع #${index + 1}: اذكر أهم التقنيات أو الأدوات المستخدمة`
          )
        );
        score -= 5;
      }
    });
  }

  // Check summary length
  if (cvData.summary) {
    const summaryLength = cvData.summary.trim().split(/\s+/).length;
    if (summaryLength < 40) {
      issues.push(
        msg(
          "Expand your summary to highlight strengths (40-120 words)",
          "وسّع الملخص لإبراز نقاط القوة (من 40 إلى 120 كلمة)"
        )
      );
      score -= 10;
    } else if (summaryLength > 120) {
      issues.push(
        msg(
          "Keep your summary concise (40-120 words)",
          "اجعل الملخص مختصراً (من 40 إلى 120 كلمة)"
        )
      );
      score -= 5;
    }
  }

  if (cvData.languages.length === 0) {
    issues.push(
      msg(
        "Add at least one language with proficiency level",
        "أضف لغة واحدة على الأقل مع مستوى الإتقان"
      )
    );
    score -= 5;
  }

  if (cvData.skills.length > 0) {
    const skillsWithLevel = cvData.skills.filter((skill) => skill.level);
    if (skillsWithLevel.length / cvData.skills.length < 0.5) {
      issues.push(
        msg(
          "Add proficiency levels to your key skills (e.g., Advanced)",
          "أضف مستوى الإتقان للمهارات الأساسية (مثال: متقدم)"
        )
      );
      score -= 5;
    }
  }

  return { score: Math.max(0, score), issues };
}

function analyzeStructure(
  cvData: CVData,
  language: "en" | "ar"
): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  const msg = (en: string, ar: string) => (language === "ar" ? ar : en);

  // Check for logical ordering
  if (cvData.experience.length > 0) {
    const dates = cvData.experience.map((exp) => new Date(exp.startDate));
    const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());

    if (JSON.stringify(dates) !== JSON.stringify(sortedDates)) {
      issues.push(
        msg(
          "List experiences in reverse chronological order (most recent first)",
          "رتب الخبرات بترتيب زمني عكسي (الأحدث أولاً)"
        )
      );
      score -= 10;
    }

    cvData.experience.forEach((exp, index) => {
      if (exp.endDate && new Date(exp.startDate) > new Date(exp.endDate)) {
        issues.push(
          msg(
            `Experience #${index + 1}: Fix inconsistent start/end dates`,
            `الخبرة #${index + 1}: صحّح تواريخ البداية والنهاية`
          )
        );
        score -= 6;
      }
    });
  }

  // Check for gaps in employment
  if (cvData.experience.length > 1) {
    for (let i = 0; i < cvData.experience.length - 1; i++) {
      const current = cvData.experience[i];
      const next = cvData.experience[i + 1];

      if (current.endDate && next.startDate) {
        const gap =
          new Date(current.startDate).getTime() -
          new Date(next.endDate!).getTime();
        const monthsGap = gap / (1000 * 60 * 60 * 24 * 30);

        if (monthsGap > 6) {
          issues.push(
            msg(
              "Consider explaining employment gaps over 6 months",
              "فكّر في توضيح الفترات التي تتجاوز 6 أشهر بدون عمل"
            )
          );
          score -= 5;
          break;
        }
      }
    }
  }

  // Check for contact information completeness
  const contactScore = [
    cvData.email,
    cvData.phone,
    cvData.location,
    cvData.linkedin || cvData.website || cvData.github,
  ].filter(Boolean).length;

  if (contactScore < 3) {
    issues.push(
      msg(
        "Add more contact information (email, phone, location, LinkedIn)",
        "أضف مزيداً من بيانات التواصل (البريد، الهاتف، الموقع، لينكدإن)"
      )
    );
    score -= 15;
  }

  if (cvData.education.length > 1) {
    const educationDates = cvData.education.map(
      (edu) => new Date(edu.startDate)
    );
    const sortedEducation = [...educationDates].sort(
      (a, b) => b.getTime() - a.getTime()
    );
    if (JSON.stringify(educationDates) !== JSON.stringify(sortedEducation)) {
      issues.push(
        msg(
          "List education entries in reverse chronological order",
          "رتب بيانات التعليم بترتيب زمني عكسي"
        )
      );
      score -= 6;
    }
  }

  const skillNameCounts = cvData.skills.reduce<Record<string, number>>(
    (map, skill) => {
      const key = skill.name.trim().toLowerCase();
      if (!key) return map;
      map[key] = (map[key] || 0) + 1;
      return map;
    },
    {}
  );

  const duplicateSkills = Object.values(skillNameCounts).some(
    (count) => count > 1
  );

  if (duplicateSkills) {
    issues.push(
      msg(
        "Remove duplicate skills to keep the list concise",
        "أزل المهارات المكررة للحفاظ على قائمة واضحة"
      )
    );
    score -= 5;
  }

  return { score: Math.max(0, score), issues };
}

function generateRecommendations(
  categories: ATSScore["categories"],
  language: "en" | "ar"
): string[] {
  const recommendations: string[] = [];
  const msg = (en: string, ar: string) => (language === "ar" ? ar : en);

  // Priority recommendations based on lowest scores
  const scores = [
    { name: "formatting", ...categories.formatting },
    { name: "keywords", ...categories.keywords },
    { name: "content", ...categories.content },
    { name: "structure", ...categories.structure },
  ].sort((a, b) => a.score - b.score);

  // Add top 5 most important recommendations
  scores.forEach((category) => {
    category.issues.forEach((issue) => {
      if (recommendations.length < 8) {
        recommendations.push(issue);
      }
    });
  });

  // Add general best practices
  if (recommendations.length < 5) {
    recommendations.push(
      msg(
        "Use a clean, professional template",
        "استخدم قالباً احترافياً ومنظماً"
      ),
      msg(
        "Keep your CV to 1-2 pages",
        "حافظ على طول السيرة الذاتية من صفحة إلى صفحتين"
      ),
      msg(
        "Customize your CV for each job application",
        "خصّص سيرتك الذاتية لكل وظيفة تتقدم لها"
      ),
      msg(
        "Proofread for spelling and grammar errors",
        "تأكد من خلو السيرة الذاتية من الأخطاء الإملائية والنحوية"
      )
    );
  }

  return recommendations;
}
