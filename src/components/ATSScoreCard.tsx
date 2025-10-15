"use client";

import { ATSScore } from "@/types/cv";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp } from "lucide-react";

interface ATSScoreCardProps {
  score: ATSScore;
  language: "en" | "ar";
}

export function ATSScoreCard({ score, language }: ATSScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle2;
    if (score >= 60) return AlertCircle;
    return XCircle;
  };

  const ScoreIcon = getScoreIcon(score.overall);

  const content = {
    en: {
      title: "ATS Score Analysis",
      description: "How well your CV performs with Applicant Tracking Systems",
      overall: "Overall Score",
      categories: {
        formatting: "Formatting",
        keywords: "Keywords",
        content: "Content Quality",
        structure: "Structure",
      },
      recommendations: "Recommendations",
      noIssues: "Excellent! No issues found.",
      scoreLabels: {
        excellent: "Excellent",
        good: "Good",
        needsWork: "Needs Improvement",
      },
    },
    ar: {
      title: "تحليل درجة ATS",
      description: "مدى توافق سيرتك الذاتية مع أنظمة تتبع المتقدمين",
      overall: "الدرجة الإجمالية",
      categories: {
        formatting: "التنسيق",
        keywords: "الكلمات المفتاحية",
        content: "جودة المحتوى",
        structure: "البنية",
      },
      recommendations: "التوصيات",
      noIssues: "ممتاز! لا توجد مشاكل.",
      scoreLabels: {
        excellent: "ممتاز",
        good: "جيد",
        needsWork: "يحتاج تحسين",
      },
    },
  };

  const t = content[language];

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t.scoreLabels.excellent;
    if (score >= 60) return t.scoreLabels.good;
    return t.scoreLabels.needsWork;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ScoreIcon
              className={`w-12 h-12 ${getScoreColor(score.overall)}`}
            />
            <div
              className={`text-6xl font-bold ${getScoreColor(score.overall)}`}
            >
              {score.overall}
            </div>
            <div className="text-2xl text-gray-400">/100</div>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {getScoreLabel(score.overall)}
          </p>
        </div>

        {/* Category Scores */}
        <div className="space-y-4">
          {Object.entries(score.categories).map(([key, data]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">
                  {t.categories[key as keyof typeof t.categories]}
                </span>
                <span className={`font-bold ${getScoreColor(data.score)}`}>
                  {data.score}/100
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    data.score >= 80
                      ? "bg-green-500"
                      : data.score >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              {data.issues.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {data.issues.map((issue, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-600">💡</span>
            {t.recommendations}
          </h3>
          {score.recommendations.length > 0 ? (
            <ul className="space-y-2">
              {score.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-600">{t.noIssues}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
