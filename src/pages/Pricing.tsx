import { Check, X, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'استارتر',
      price: 'رایگان',
      period: '',
      description: 'برای پروژه‌های کوچک و تست',
      popular: false,
      features: [
        { text: 'تا ۱۰۰۰ کاربر فعال', included: true },
        { text: 'احراز هویت پایه', included: true },
        { text: 'پشتیبانی ایمیل', included: true },
        { text: 'مستندات کامل', included: true },
        { text: 'احراز هویت دومرحله‌ای', included: false },
        { text: 'تحلیل رفتار کاربر', included: false },
        { text: 'پشتیبانی ۲۴/۷', included: false },
        { text: 'SLA تضمینی', included: false }
      ]
    },
    {
      name: 'حرفه‌ای',
      price: '۴۹۰,۰۰۰',
      period: 'تومان/ماه',
      description: 'برای کسب‌وکارهای در حال رشد',
      popular: true,
      features: [
        { text: 'تا ۱۰,۰۰۰ کاربر فعال', included: true },
        { text: 'تمام قابلیت‌های پایه', included: true },
        { text: 'احراز هویت دومرحله‌ای', included: true },
        { text: 'تحلیل رفتار کاربر', included: true },
        { text: 'پشتیبانی اولویت‌دار', included: true },
        { text: 'گزارش‌های تحلیلی', included: true },
        { text: 'انتگرال API کامل', included: true },
        { text: 'SLA ۹۹.۹%', included: false }
      ]
    },
    {
      name: 'سازمانی',
      price: '۱,۴۹۰,۰۰۰',
      period: 'تومان/ماه',
      description: 'برای سازمان‌های بزرگ',
      popular: false,
      features: [
        { text: 'کاربران نامحدود', included: true },
        { text: 'تمام قابلیت‌های حرفه‌ای', included: true },
        { text: 'پشتیبانی اختصاصی ۲۴/۷', included: true },
        { text: 'SLA ۹۹.۹% تضمینی', included: true },
        { text: 'پیاده‌سازی اختصاصی', included: true },
        { text: 'آموزش تیم', included: true },
        { text: 'مشاوره امنیتی', included: true },
        { text: 'گزارش‌های سفارشی', included: true }
      ]
    }
  ];

  const faqs = [
    {
      question: 'آیا می‌توانم پلن خود را تغییر دهم؟',
      answer: 'بله، می‌توانید در هر زمان پلن خود را ارتقا یا کاهش دهید. تغییرات از ماه بعد اعمال خواهد شد.'
    },
    {
      question: 'آیا دوره آزمایشی رایگان وجود دارد؟',
      answer: 'پلن استارتر کاملاً رایگان است. برای پلن‌های پولی نیز ۳۰ روز ضمانت بازگشت وجه داریم.'
    },
    {
      question: 'نحوه پرداخت چگونه است؟',
      answer: 'پرداخت به صورت ماهانه یا سالانه امکان‌پذیر است. با پرداخت سالانه ۲۰% تخفیف دریافت خواهید کرد.'
    },
    {
      question: 'آیا محدودیت درخواست وجود دارد؟',
      answer: 'هر پلن محدودیت منطقی برای استفاده عادلانه دارد. در صورت نیاز به درخواست‌های بیشتر، با ما تماس بگیرید.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-persian bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-persian-xl font-bold mb-6">
            قیمت‌گذاری شفاف
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              بدون هزینه‌های پنهان
            </span>
          </h1>
          <p className="text-persian-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            پلن مناسب خود را انتخاب کنید. همه پلن‌ها شامل پشتیبانی کامل و به‌روزرسانی‌های رایگان هستند
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-persian">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`card-persian-hover relative ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star size={16} />
                      محبوب‌ترین
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-persian-lg mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground mr-2">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="text-persian-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="text-primary" size={20} />
                        ) : (
                          <X className="text-muted-foreground" size={20} />
                        )}
                        <span className={`text-persian-base ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Link to="/auth?type=signup">
                      <Button 
                        className={`w-full text-persian-base py-6 ${
                          plan.popular 
                            ? 'btn-persian-primary' 
                            : 'btn-persian-outline'
                        }`}
                      >
                        {plan.price === 'رایگان' ? 'شروع رایگان' : 'انتخاب پلن'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-persian bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-persian-xl font-bold mb-6">
              سؤالات متداول
            </h2>
            <p className="text-persian-lg text-muted-foreground">
              پاسخ سؤالات رایج درباره قیمت‌گذاری و خدمات
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-persian">
                <CardHeader>
                  <CardTitle className="text-persian-lg text-right">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-persian-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="section-persian">
        <div className="container mx-auto px-6">
          <div className="card-persian text-center max-w-4xl mx-auto">
            <h2 className="text-persian-xl font-bold mb-6">
              نیاز به راه‌حل سفارشی دارید؟
            </h2>
            <p className="text-persian-lg text-muted-foreground mb-8">
              برای سازمان‌های بزرگ با نیازهای خاص، راه‌حل‌های اختصاصی طراحی می‌کنیم
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-persian-primary text-persian-base px-8 py-6">
                تماس با فروش
              </Button>
              <Link to="/docs">
                <Button className="btn-persian-outline text-persian-base px-8 py-6">
                  درخواست دمو
                </Button>
              </Link>
            </div>
          </div>
        </div>  
      </section>
    </div>
  );
};

export default Pricing;