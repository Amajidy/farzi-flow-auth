import { Shield, Lock, Users, Zap, Eye, Clock, Globe, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: 'امنیت چندلایه',
      description: 'حفاظت پیشرفته با رمزنگاری AES-256، تشخیص تهدیدات هوشمند و پایش ۲۴/۷',
      features: ['رمزنگاری end-to-end', 'تشخیص حملات DDoS', 'پایش امنیتی لحظه‌ای', 'گزارش‌دهی خودکار']
    },
    {
      icon: Lock,
      title: 'احراز هویت دومرحله‌ای',
      description: 'تایید هویت قوی با پشتیبانی کامل از استانداردهای بین‌المللی',
      features: ['SMS و ایمیل OTP', 'اپلیکیشن‌های Authenticator', 'کلیدهای امنیتی FIDO2', 'بیومتریک']
    },
    {
      icon: Users,
      title: 'مدیریت کاربران پیشرفته',
      description: 'سیستم جامع مدیریت کاربران با امکانات کنترل دسترسی پیشرفته',
      features: ['نقش‌ها و مجوزها', 'گروه‌بندی کاربران', 'تفویض اختیارات', 'حسابرسی فعالیت‌ها']
    },
    {
      icon: Zap,
      title: 'عملکرد فوق‌سریع',
      description: 'پردازش بلادرنگ درخواست‌ها با زیرساخت مقیاس‌پذیر',
      features: ['پاسخ زیر ۱ میلی‌ثانیه', 'خودکارسازی مقیاس‌بندی', 'توزیع جهانی CDN', '۹۹.۹% آپتایم']
    }
  ];

  const additionalFeatures = [
    {
      icon: Eye,
      title: 'تحلیل رفتار کاربر',
      description: 'تشخیص الگوهای مشکوک و جلوگیری از دسترسی‌های غیرمجاز'
    },
    {
      icon: Clock,
      title: 'مدیریت جلسات',
      description: 'کنترل کامل بر جلسات کاربری با امکان قطع از راه دور'
    },
    {
      icon: Globe,
      title: 'پشتیبانی چندزبانه',
      description: 'رابط کاربری بومی‌سازی شده برای بازارهای مختلف'
    },
    {
      icon: Smartphone,
      title: 'تجربه موبایل بهینه',
      description: 'طراحی واکنش‌گرا و بهینه‌سازی کامل برای دستگاه‌های موبایل'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-persian bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-persian-xl font-bold mb-6">
            قابلیت‌های پیشرفته
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              احراز هویت ایمن
            </span>
          </h1>
          <p className="text-persian-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            کشف کنید چگونه قابلیت‌های پیشرفته ما می‌تواند امنیت و تجربه کاربری پلتفرم شما را به سطح جدیدی برساند
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="section-persian">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="card-persian-hover">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-persian-lg">{feature.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-persian-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>                  
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-persian-base">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="section-persian bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-persian-xl font-bold mb-6">
              ویژگی‌های اضافی
            </h2>
            <p className="text-persian-lg text-muted-foreground">
              قابلیت‌هایی که تجربه شما را کامل می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="card-persian-hover text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="text-secondary-foreground" size={32} />
                  </div>
                  <CardTitle className="text-persian-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-persian-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Demo */}
      <section className="section-persian">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-persian-xl font-bold mb-6">
                راه‌اندازی آسان در ۳ مرحله
              </h2>
              <p className="text-persian-lg text-muted-foreground">
                در کمتر از ۵ دقیقه سیستم احراز هویت خود را راه‌اندازی کنید
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">۱</span>
                </div>
                <h3 className="text-persian-lg font-semibold mb-3">ثبت‌نام و دریافت API Key</h3>
                <p className="text-persian-base text-muted-foreground">
                  در کمتر از ۱ دقیقه حساب کاربری خود را ایجاد کنید
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">۲</span>
                </div>
                <h3 className="text-persian-lg font-semibold mb-3">پیکربندی و تست</h3>
                <p className="text-persian-base text-muted-foreground">
                  تنظیمات را بر اساس نیازهای خود شخصی‌سازی کنید
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">۳</span>
                </div>
                <h3 className="text-persian-lg font-semibold mb-3">راه‌اندازی در پروداکشن</h3>
                <p className="text-persian-base text-muted-foreground">
                  با اطمینان کامل سیستم را در محیط واقعی فعال کنید
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth?type=signup">
                <Button className="btn-persian-primary text-persian-base px-12 py-6">
                  همین حالا شروع کنید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;