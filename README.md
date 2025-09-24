# سرویس احراز هویت ایمن - Persian Authentication Service

این پروژه یک سایت لندینگ کامل برای سرویس احراز هویت با پشتیبانی کامل از زبان فارسی و جهت RTL ساخته شده است.

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه ۱۸ یا بالاتر)
- npm یا yarn

### مراحل نصب

```bash
# 1. کلون کردن پروژه
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

# 2. نصب وابستگی‌ها
npm install

# 3. اجرای پروژه در حالت توسعه
npm run dev

# 4. مشاهده در مرورگر
# http://localhost:8080
```

### ساخت نسخه تولید

```bash
# ساخت نسخه بهینه‌شده
npm run build

# اجرای نسخه تولید (محلی)
npm run preview
```

## 🎨 ویژگی‌های اصلی

- **پشتیبانی کامل از RTL و فارسی** با فونت Vazir
- **انیمیشن‌های GSAP پیشرفته** با ScrollTrigger
- **طراحی واکنش‌گرا** برای تمام دستگاه‌ها
- **سیستم طراحی یکپارچه** با Tailwind CSS
- **مدیریت redirect** با اعتبارسنجی پارامترها

## 📱 صفحات

1. **صفحه اصلی** - Hero section با انیمیشن‌های سینمایی
2. **قابلیت‌ها** - معرفی امکانات سرویس
3. **قیمت‌گذاری** - پلن‌های مختلف خدمات
4. **مستندات** - راهنمای فنی و قوانین redirect
5. **احراز هویت** - صفحات ورود و ثبت‌نام

## 🔧 تنظیمات GSAP

انیمیشن‌های GSAP در فایل `src/components/HeroAnimated.tsx` تعریف شده‌اند.

### تغییر شدت انیمیشن‌ها

```javascript
// در فایل HeroAnimated.tsx
const animationIntensity = {
  low: 0.3,
  medium: 0.6,
  high: 1.0
};
```

## 🌐 مدیریت Redirect

سیستم redirect در `/incoming` یا `/r` قابل دسترسی است.

### پارامترهای مورد نیاز

- `role` (اجباری): نقش کاربر (visitor, user, admin, moderator)
- `website` (اجباری): دامنه وب‌سایت مبدا
- `name` (اختیاری): نام کاربر
- `family` (اختیاری): نام خانوادگی

### نمونه URL

```
https://yoursite.com/incoming?role=visitor&website=example.com&name=علی&family=رضایی
```

## 🎯 تغییر قوانین اعتبارسنجی

قوانین redirect در فایل `src/pages/Incoming.tsx` قابل ویرایش هستند:

```javascript
const validRoles = ['visitor', 'user', 'admin', 'moderator'];
// برای افزودن نقش جدید، به این آرایه اضافه کنید
```

## 🎨 سیستم طراحی

تمام رنگ‌ها و استایل‌ها در فایل‌های زیر تعریف شده‌اند:

- `src/index.css` - متغیرهای CSS و کلاس‌های فارسی
- `tailwind.config.ts` - تنظیمات Tailwind CSS

### تغییر رنگ‌های اصلی

```css
/* در فایل src/index.css */
:root {
  --primary: 220 91% 55%; /* آبی اصلی */
  --secondary: 45 93% 58%; /* طلایی */
  /* سایر رنگ‌ها... */
}
```

## 📦 فایل‌های ایجاد شده

- `src/components/HeroAnimated.tsx` - کامپوننت اصلی انیمیشن
- `src/components/Navigation.tsx` - منوی ناوبری
- `src/components/Footer.tsx` - فوتر سایت
- `src/pages/Index.tsx` - صفحه اصلی
- `src/pages/Features.tsx` - صفحه قابلیت‌ها
- `src/pages/Pricing.tsx` - صفحه قیمت‌گذاری
- `src/pages/Docs.tsx` - صفحه مستندات
- `src/pages/Auth.tsx` - صفحه احراز هویت
- `src/pages/Incoming.tsx` - مدیریت redirect

## 🛡️ امنیت

- اعتبارسنجی سمت کلاینت برای تمام فرم‌ها
- Sanitization ورودی‌های کاربر
- مدیریت امن پارامترهای URL

## 📞 پشتیبانی

برای سؤالات و پشتیبانی:
- ایمیل: info@secureauth.ir
- تلفن: ۰۲۱-۱۲۳۴۵۶۷۸

---

**نکته**: این پروژه برای نمایش قابلیت‌ها طراحی شده و برای استفاده در تولید نیاز به backend واقعی دارد.