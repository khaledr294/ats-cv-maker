import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Builder - بناء السيرة الذاتية",
  description:
    "أنشئ سيرتك الذاتية خطوة بخطوة باستخدام قوالب احترافية. Build your professional CV step by step with ATS-optimized templates.",
  openGraph: {
    title: "CV Builder - بناء السيرة الذاتية",
    description:
      "أنشئ سيرتك الذاتية خطوة بخطوة. Build your professional CV step by step.",
    images: ["/og-builder.png"],
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
