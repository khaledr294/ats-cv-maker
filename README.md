# 🎯 ATS CV Maker - Professional Resume Builder

<div align="center">

![CV Maker](https://img.shields.io/badge/CV-Maker-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)

**Create stunning, ATS-optimized CVs in minutes!**

[English](#english) | [العربية](#arabic)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

</div>

---

## <a name="english"></a> 🇬🇧 English

### ✨ Features

#### 📄 **5 Professional Templates**
Choose from beautifully designed, ATS-friendly templates:
- **Modern** - Clean & professional with accent colors
- **Classic** - Traditional and timeless design
- **Creative** - Stand out with a sidebar layout
- **Minimal** - Simple and elegant typography
- **Executive** - Corporate and sophisticated

#### 🎯 **ATS Score Analysis**
Get instant feedback on your CV's compatibility with Applicant Tracking Systems:
- Overall score (0-100)
- 4 category analysis: Formatting, Keywords, Content, Structure
- Actionable recommendations
- Real-time score updates

#### 💾 **Multiple Export Formats**
- **PDF Export** - Professional, print-ready format
- **DOCX Export** - Microsoft Word compatible

#### 🌍 **Bilingual Support**
- Full support for Arabic (RTL) and English (LTR)
- Instant language switching
- All templates support both languages

#### 🎨 **Interactive CV Builder**
- Step-by-step wizard (7 easy steps)
- Real-time preview
- Color theme customization (6 colors)
- Add unlimited experiences, education, skills
- Drag-and-drop sections (coming soon)

#### 🆓 **Free Forever**
- Try once without registration
- Unlimited CVs after free signup
- No credit card required
- No hidden fees

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+ 
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cv-maker.git
cd cv-maker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize database
npx prisma migrate dev

# Start development server
npm run dev
```

Visit `http://localhost:3000` 🎉

### 📸 Screenshots

#### Landing Page
Beautiful, responsive landing page with features showcase

#### CV Builder
Intuitive step-by-step wizard with live preview

#### ATS Score
Comprehensive analysis with actionable recommendations

#### Export
One-click export to PDF or DOCX

### 🏗️ Project Structure

```
cv-maker/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── builder/           # CV Builder
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── templates/         # 5 CV templates
│   │   ├── ATSScoreCard.tsx   # ATS analysis
│   │   └── ui/                # Reusable components
│   ├── lib/
│   │   ├── ats-analyzer.ts    # ATS scoring engine
│   │   ├── export.ts          # PDF/DOCX export
│   │   └── prisma.ts          # Database client
│   └── types/
│       └── cv.ts              # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

### 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS |
| **UI Components** | Radix UI + shadcn/ui |
| **Database** | SQLite (Prisma ORM) |
| **Authentication** | NextAuth.js (planned) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **PDF Export** | jsPDF |
| **DOCX Export** | docx |
| **Notifications** | Sonner |

### 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 🚢 Deployment

#### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy! ✨

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Other Platforms
- Netlify
- Railway
- Render
- Any Node.js hosting

### 🎯 Roadmap

- [x] 5 Professional Templates
- [x] ATS Score Analysis
- [x] PDF/DOCX Export
- [x] Bilingual Support
- [ ] User Authentication
- [ ] Save CVs to Database
- [ ] Cover Letter Builder
- [ ] AI-Powered Suggestions
- [ ] LinkedIn Import

### 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

MIT License - See [LICENSE](LICENSE)

### 🌟 Show your support

Give a ⭐️ if this project helped you!

---

## <a name="arabic"></a> 🇸🇦 العربية

### ✨ المميزات

#### 📄 **5 قوالب احترافية**
اختر من بين قوالب مصممة بعناية ومتوافقة مع أنظمة التوظيف:
- **عصري** - نظيف واحترافي مع ألوان مميزة
- **كلاسيكي** - تصميم تقليدي وخالد
- **إبداعي** - تميز مع تخطيط جانبي
- **بسيط** - طباعة بسيطة وأنيقة
- **تنفيذي** - مؤسسي ومتطور

#### 🎯 **تحليل درجة ATS**
احصل على تقييم فوري لتوافق سيرتك الذاتية مع أنظمة تتبع المتقدمين:
- درجة إجمالية (0-100)
- تحليل 4 فئات: التنسيق، الكلمات المفتاحية، المحتوى، البنية
- توصيات قابلة للتنفيذ
- تحديثات فورية للدرجة

#### 💾 **صيغ تصدير متعددة**
- **تصدير PDF** - صيغة احترافية جاهزة للطباعة
- **تصدير DOCX** - متوافقة مع Microsoft Word

#### 🌍 **دعم ثنائي اللغة**
- دعم كامل للعربية (من اليمين لليسار) والإنجليزية
- تبديل فوري للغة
- جميع القوالب تدعم اللغتين

#### 🎨 **منشئ سيرة ذاتية تفاعلي**
- معالج خطوة بخطوة (7 خطوات سهلة)
- معاينة مباشرة
- تخصيص ألوان القالب (6 ألوان)
- إضافة خبرات وتعليم ومهارات غير محدودة
- سحب وإفلات الأقسام (قريباً)

#### 🆓 **مجاني للأبد**
- جرب مرة بدون تسجيل
- سير ذاتية غير محدودة بعد التسجيل المجاني
- لا حاجة لبطاقة ائتمان
- بدون رسوم خفية

### 🚀 البدء السريع

#### المتطلبات
- Node.js 18+ 
- npm أو yarn

#### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/yourusername/cv-maker.git
cd cv-maker

# تثبيت المكتبات
npm install

# إعداد متغيرات البيئة
cp .env.example .env

# تهيئة قاعدة البيانات
npx prisma migrate dev

# تشغيل خادم التطوير
npm run dev
```

قم بزيارة `http://localhost:3000` 🎉

### 📸 لقطات الشاشة

#### الصفحة الرئيسية
صفحة هبوط جميلة ومتجاوبة مع عرض المميزات

#### منشئ السيرة الذاتية
معالج خطوة بخطوة سهل مع معاينة مباشرة

#### درجة ATS
تحليل شامل مع توصيات قابلة للتنفيذ

#### التصدير
تصدير بنقرة واحدة إلى PDF أو DOCX

### 🏗️ هيكل المشروع

```
cv-maker/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── page.tsx           # الصفحة الرئيسية
│   │   ├── builder/           # منشئ السيرة الذاتية
│   │   └── layout.tsx         # التخطيط الأساسي
│   ├── components/
│   │   ├── templates/         # 5 قوالب سير ذاتية
│   │   ├── ATSScoreCard.tsx   # تحليل ATS
│   │   └── ui/                # مكونات قابلة لإعادة الاستخدام
│   ├── lib/
│   │   ├── ats-analyzer.ts    # محرك تقييم ATS
│   │   ├── export.ts          # تصدير PDF/DOCX
│   │   └── prisma.ts          # عميل قاعدة البيانات
│   └── types/
│       └── cv.ts              # أنواع TypeScript
├── prisma/
│   └── schema.prisma          # مخطط قاعدة البيانات
└── public/                    # الملفات الثابتة
```

### 🛠️ التقنيات المستخدمة

| الفئة | التقنية |
|------|---------|
| **الإطار** | Next.js 14 (App Router) |
| **اللغة** | TypeScript 5 |
| **التنسيق** | Tailwind CSS |
| **مكونات الواجهة** | Radix UI + shadcn/ui |
| **قاعدة البيانات** | SQLite (Prisma ORM) |
| **المصادقة** | NextAuth.js (مخطط) |
| **الحركات** | Framer Motion |
| **الأيقونات** | Lucide React |
| **تصدير PDF** | jsPDF |
| **تصدير DOCX** | docx |
| **الإشعارات** | Sonner |

### 📦 البناء للإنتاج

```bash
# بناء التطبيق
npm run build

# تشغيل خادم الإنتاج
npm start
```

### 🚢 النشر

#### Vercel (موصى به)
1. ارفع المشروع على GitHub
2. استورد المشروع في Vercel
3. انشر! ✨

أو اضغط: [![النشر مع Vercel](https://vercel.com/button)](https://vercel.com/new)

#### منصات أخرى
- Netlify
- Railway
- Render
- أي استضافة Node.js

### 🎯 خارطة الطريق

- [x] 5 قوالب احترافية
- [x] تحليل درجة ATS
- [x] تصدير PDF/DOCX
- [x] دعم ثنائي اللغة
- [ ] مصادقة المستخدمين
- [ ] حفظ السير الذاتية في قاعدة البيانات
- [ ] منشئ خطابات الغلاف
- [ ] اقتراحات مدعومة بالذكاء الاصطناعي
- [ ] استيراد من LinkedIn

### 🤝 المساهمة

المساهمات مرحب بها! يرجى قراءة [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork المشروع
2. أنشئ فرع الميزة الخاص بك (`git checkout -b feature/amazing-feature`)
3. Commit تغييراتك (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

### 📄 الترخيص

رخصة MIT - انظر [LICENSE](LICENSE)

### 🌟 أظهر دعمك

أعط ⭐️ إذا ساعدك هذا المشروع!

---

<div align="center">

**🎯 Made with ❤️ for job seekers worldwide**

**صنع بـ ❤️ للباحثين عن عمل في كل مكان**

[Website](#) • [Documentation](DEVELOPMENT.md) • [Contributing](CONTRIBUTING.md) • [License](LICENSE)

</div>
