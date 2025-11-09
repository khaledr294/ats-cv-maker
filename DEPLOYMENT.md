# 🚀 دليل النشر على Cloudflare Pages

## خطوات النشر

### الطريقة 1: عبر واجهة Cloudflare Pages (الأسهل)

#### 1. الإعداد الأولي
1. افتح [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. قم بتسجيل الدخول أو إنشاء حساب مجاني
3. اذهب إلى **Workers & Pages** > **Create application** > **Pages**

#### 2. ربط المستودع
1. اضغط على **Connect to Git**
2. اختر **GitHub** وقم بتفويض Cloudflare
3. اختر مستودع `khaledr294/ats-cv-maker`
4. اضغط **Begin setup**

#### 3. إعدادات البناء
```
Project name: cv-maker
Production branch: main
Build command: npm run build
Build output directory: out
```

#### 4. المتغيرات البيئية (Environment Variables)
```
NEXT_PUBLIC_BASE_URL = https://your-domain.pages.dev
```

#### 5. النشر
1. اضغط **Save and Deploy**
2. انتظر 2-3 دقائق حتى ينتهي البناء
3. افتح الرابط المعطى (مثل: `cv-maker.pages.dev`)

---

### الطريقة 2: عبر Wrangler CLI (للمطورين)

#### 1. تثبيت Wrangler
```bash
npm install -g wrangler
```

#### 2. تسجيل الدخول
```bash
wrangler login
```

#### 3. البناء والنشر
```bash
# بناء المشروع
npm run build

# نشر مجلد out
npx wrangler pages deploy out --project-name=cv-maker
```

---

## ✅ التحقق من النشر

### اختبارات ما بعد النشر:
- [ ] الصفحة الرئيسية تفتح بدون أخطاء
- [ ] `/builder` يعمل بشكل صحيح
- [ ] التبديل بين العربية والإنجليزية يعمل
- [ ] تصدير PDF يعمل
- [ ] الصور تظهر (og-image.svg, og-builder.svg)
- [ ] ATS Score يحسب بشكل صحيح
- [ ] جميع القوالب الخمسة تعمل

---

## 🔧 إعدادات إضافية

### 1. ربط Domain مخصص (اختياري)
```
Dashboard > Your Project > Custom domains > Add custom domain
```

مثال: `cv-maker.com` أو `resume.yourdomain.com`

### 2. تفعيل HTTPS
- ✅ تلقائي - Cloudflare يوفر شهادة SSL مجانية

### 3. إعدادات الأداء
```
Dashboard > Your Project > Settings > Functions
```
- تفعيل Edge Caching ✅
- Minification ✅
- Compression ✅

### 4. Analytics (اختياري)
```
Dashboard > Your Project > Analytics
```
- عرض الزيارات
- تتبع الأداء
- مجاني بالكامل

---

## 📝 ملاحظات مهمة

### حجم المشروع
- **الصفحة الرئيسية**: 48.2 kB
- **صفحة البناء**: 211 kB
- **Shared JS**: 100 kB
- **إجمالي**: ~360 kB ✅ (ممتاز!)

### الحدود المجانية لـ Cloudflare Pages:
- ✅ 500 builds شهرياً
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 100 custom domains

### الأداء المتوقع:
- **Time to First Byte (TTFB)**: < 100ms
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Lighthouse Score**: 95+ ✅

---

## 🔄 التحديثات المستقبلية

بعد النشر الأولي، أي `git push` إلى `main` سيؤدي إلى:
1. Build تلقائي على Cloudflare
2. نشر تلقائي بعد نجاح البناء
3. تحديث الموقع المباشر خلال 2-3 دقائق

---

## 🆘 استكشاف الأخطاء

### مشكلة: Build فشل
**الحل**: 
```bash
# تأكد من أن البناء يعمل محلياً أولاً
npm run build

# تحقق من اللوجز في Cloudflare Dashboard
```

### مشكلة: الصفحة تعرض 404
**الحل**: تأكد من أن `Build output directory` = `out`

### مشكلة: CSS لا يعمل
**الحل**: تحقق من أن `next.config.js` يحتوي على:
```javascript
output: 'export'
```

### مشكلة: الروابط لا تعمل
**الحل**: استخدم `Link` من next/link بدلاً من `<a>`

---

## 📞 الدعم

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Community Discord](https://discord.gg/cloudflaredev)

---

## ✅ النتيجة النهائية

بعد اتباع هذه الخطوات، سيكون لديك:
- ✅ موقع سريع ومستجيب
- ✅ HTTPS مجاني
- ✅ CDN عالمي
- ✅ نشر تلقائي مع كل commit
- ✅ بدون تكلفة!

**الموقع المباشر**: `https://cv-maker.pages.dev` (أو domain الخاص بك)
