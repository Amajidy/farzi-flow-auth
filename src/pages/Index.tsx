import HeroAnimated from '@/components/HeroAnimated';
import { Shield, Lock, Users, Zap, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'امنیت پیشرفته',
      description: 'حفاظت چندلایه با رمزنگاری ۲۵۶ بیتی و تشخیص تهدیدات هوشمند'
    },
    {
      icon: Lock,  
      title: 'احراز هویت دومرحله‌ای',
      description: 'تایید هویت دومرحله‌ای با پشتیبانی از SMS، ایمیل و اپلیکیشن‌های Authenticator'
    },
    {
      icon: Users,
      title: 'مدیریت کاربران',
      description: 'مدیریت جامع کاربران با نقش‌ها و مجوزهای قابل تنظیم'
    },
    {
      icon: Zap,
      title: 'عملکرد بالا',
      description: 'پاسخ‌دهی فوق‌سریع با ۹۹.۹% آپتایم و پردازش موازی درخواست‌ها'
    }
  ];

  const testimonials = [
    {
      name: 'علی رضایی',
      role: 'مدیر فنی شرکت تک‌پرداز',
      content: 'با استفاده از این سرویس، امنیت پلتفرم ما به شدت بهبود یافته و رضایت کاربران افزایش پیدا کرده.',
      rating: 5
    },
    {
      name: 'فاطمه احمدی',
      role: 'توسعه‌دهنده ارشد',
      content: 'پیاده‌سازی آسان و مستندات کامل. در کمتر از یک روز توانستیم سیستم احراز هویت را راه‌اندازی کنیم.',
      rating: 5
    },
    {
      name: 'محمد کریمی',
      role: 'مؤسس استارتاپ فین‌تک',
      content: 'قابلیت‌های امنیتی فوق‌العاده و پشتیبانی ۲۴/۷. برای کسب‌وکارهای آنلاین بسیار مناسب است.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with GSAP Animation */}
      <HeroAnimated />

      {/* Features Section */}
      <section className="section-persian bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-persian-xl font-bold mb-6">
              چرا احراز هویت ایمن؟
            </h2>
            <p className="text-persian-lg text-muted-foreground max-w-3xl mx-auto">
              با بهره‌گیری از جدیدترین تکنولوژی‌های امنیتی، تجربه‌ای ایمن و روان برای کاربران خود فراهم کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-persian-hover text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="text-white" size={32} />
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

      {/* Integration CTA */}
      <section className="section-persian">
        <div className="container mx-auto px-6">
          <div className="card-persian text-center max-w-4xl mx-auto">
            <h2 className="text-persian-xl font-bold mb-6">
              در ۵ دقیقه شروع کنید
            </h2>
            <p className="text-persian-lg text-muted-foreground mb-8">
              با چند خط کد ساده، سیستم احراز هویت حرفه‌ای را به پروژه خود اضافه کنید
            </p>
            
            <div className="bg-muted rounded-lg p-6 mb-8 text-right">
              <code className="text-sm font-mono text-foreground">
                {`// نصب کتابخانه
npm install secureauth-sdk

// راه‌اندازی در پروژه
import { SecureAuth } from 'secureauth-sdk';

const auth = new SecureAuth({
  apiKey: 'your-api-key',
  domain: 'your-domain.com'
});

// شروع فرآیند احراز هویت
auth.authenticate(user);`}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs">
                <Button className="btn-persian-primary text-persian-base">
                  مشاهده مستندات کامل
                </Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button className="btn-persian-outline text-persian-base">
                  دریافت API Key
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-persian bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-persian-xl font-bold mb-6">
              نظرات کاربران
            </h2>
            <p className="text-persian-lg text-muted-foreground">
              آنچه توسعه‌دهندگان و کسب‌وکارها درباره ما می‌گویند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-persian-hover">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-secondary fill-current" size={20} />
                    ))}
                  </div>
                  <CardDescription className="text-persian-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-right">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-persian">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-persian-xl font-bold mb-6">
            امروز شروع کنید
          </h2>
          <p className="text-persian-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            به بیش از ۱۰۰ هزار توسعه‌دهنده که به احراز هویت ایمن اعتماد کرده‌اند، بپیوندید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?type=signup">
              <Button className="btn-persian-primary text-persian-base px-12 py-6">
                ثبت‌نام رایگان
              </Button>
            </Link>
            <Link to="/pricing">
              <Button className="btn-persian-outline text-persian-base px-12 py-6">
                مشاهده قیمت‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
