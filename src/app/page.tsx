"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Globe,
  Download,
  Zap,
  CheckCircle2,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function Home() {
  const [locale, setLocale] = useState<"en" | "ar">("ar");

  const content = {
    en: {
      hero: {
        title: "Create Your Perfect CV",
        subtitle: "in Minutes, Not Hours",
        description:
          "Professional, beautiful, and ATS-friendly resumes. Support for Arabic and English with 5 stunning templates.",
        cta: "Start Building - Free",
        tryFree: "Try it free, no signup required",
      },
      features: [
        {
          icon: FileText,
          title: "5 Professional Templates",
          description: "Choose from tested, professional templates",
        },
        {
          icon: Globe,
          title: "Arabic & English",
          description: "Full RTL support for perfect Arabic CVs",
        },
        {
          icon: Download,
          title: "Export to PDF",
          description: "Download your professional CV instantly",
        },
        {
          icon: Zap,
          title: "Quick & Easy",
          description: "Interactive, flexible, and fun to use",
        },
      ],
      howItWorks: {
        title: "How It Works",
        steps: [
          { number: "1", text: "Try for free without signup" },
          { number: "2", text: "Choose your template & language" },
          { number: "3", text: "Fill in your information" },
          { number: "4", text: "Download & share" },
        ],
      },
      pricing: {
        title: "Simple Pricing",
        free: {
          title: "Always Free",
          features: [
            "Unlimited CVs",
            "All 5 templates",
            "PDF export",
            "Arabic & English",
            "No credit card needed",
          ],
          cta: "Get Started",
        },
        support: {
          title: "Support Us",
          description: "Love our tool? Help us grow and add more features!",
          cta: "Donate",
        },
      },
    },
    ar: {
      hero: {
        title: "أنشئ سيرتك الذاتية المثالية",
        subtitle: "في دقائق، وليس ساعات",
        description:
          "سير ذاتية احترافية وجميلة ومتوافقة مع أنظمة التوظيف. دعم كامل للعربية والإنجليزية مع 5 قوالب رائعة.",
        cta: "ابدأ الآن - مجاناً",
        tryFree: "جرب مرة مجاناً بدون تسجيل",
      },
      features: [
        {
          icon: FileText,
          title: "5 قوالب احترافية",
          description: "اختر من بين قوالب احترافية مُجرّبة",
        },
        {
          icon: Globe,
          title: "العربية والإنجليزية",
          description: "دعم كامل للغة العربية من اليمين لليسار",
        },
        {
          icon: Download,
          title: "تصدير PDF",
          description: "حمّل سيرتك الذاتية الاحترافية فوراً",
        },
        {
          icon: Zap,
          title: "سريع وسهل",
          description: "تفاعلي، مرن، وممتع في الاستخدام",
        },
      ],
      howItWorks: {
        title: "كيف يعمل",
        steps: [
          { number: "1", text: "جرب مجاناً بدون تسجيل" },
          { number: "2", text: "اختر القالب واللغة" },
          { number: "3", text: "املأ بياناتك" },
          { number: "4", text: "حمّل وشارك" },
        ],
      },
      pricing: {
        title: "تسعير بسيط",
        free: {
          title: "مجاني دائماً",
          features: [
            "سير ذاتية غير محدودة",
            "جميع القوالب الـ 5",
            "تصدير PDF",
            "العربية والإنجليزية",
            "لا حاجة لبطاقة ائتمان",
          ],
          cta: "ابدأ الآن",
        },
        support: {
          title: "ادعمنا",
          description:
            "أعجبتك الأداة؟ ساعدنا على النمو وإضافة المزيد من المميزات!",
          cta: "تبرع",
        },
      },
    },
  };

  const t = content[locale];

  return (
    <div
      className={`min-h-screen ${
        locale === "ar" ? "font-cairo" : "font-inter"
      }`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>CV Maker</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
            <Link
              href="/builder"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              {locale === "en" ? "Get Started" : "ابدأ الآن"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {t.hero.title}
              <span className="block text-primary mt-2">{t.hero.subtitle}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/builder"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-muted-foreground">{t.hero.tryFree}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <p className="text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.pricing.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-lg border-2 border-primary bg-card">
              <h3 className="text-2xl font-bold mb-4">
                {t.pricing.free.title}
              </h3>
              <ul className="space-y-3 mb-6">
                {t.pricing.free.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/builder"
                className="block w-full py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:opacity-90 transition-opacity"
              >
                {t.pricing.free.cta}
              </Link>
            </div>

            {/* Support */}
            <div className="p-8 rounded-lg border bg-card">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                {t.pricing.support.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t.pricing.support.description}
              </p>
              <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                {t.pricing.support.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            © 2025 CV Maker. {locale === "en" ? "Made with" : "صنع بـ"}{" "}
            <Heart className="inline w-4 h-4 text-red-500" />{" "}
            {locale === "en"
              ? "for job seekers worldwide"
              : "للباحثين عن عمل في كل مكان"}
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
