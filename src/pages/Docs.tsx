import { useState } from 'react';
import { Book, Code, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Docs = () => {
  const [activeTab, setActiveTab] = useState('redirect');

  const redirectRules = [
    {
      title: 'پارامتر role (اجباری)',
      description: 'نقش کاربر که باید یکی از مقادیر مجاز باشد',
      example: 'visitor, user, admin, moderator',
      required: true
    },
    {
      title: 'پارامتر website (اجباری)', 
      description: 'دامنه وب‌سایت مبدا بدون پروتکل',
      example: 'example.com, shop.domain.ir',
      required: true
    },
    {
      title: 'پارامتر name (اختیاری)',
      description: 'نام کاربر برای شخصی‌سازی پیام خوش‌آمدگویی',
      example: 'علی‌رضا, فاطمه',
      required: false
    },
    {
      title: 'پارامتر family (اختیاری)',
      description: 'نام خانوادگی کاربر',
      example: 'احمدی, رضایی',
      required: false
    }
  ];

  const sampleUrls = [
    {
      title: 'حداقل پارامترهای مورد نیاز',
      url: 'https://secureauth.ir/incoming?role=visitor&website=example.com'
    },
    {
      title: 'با اطلاعات کامل کاربر',
      url: 'https://secureauth.ir/incoming?role=user&website=shop.domain.ir&name=علی‌رضا&family=احمدی'
    },
    {
      title: 'کاربر مدیر',
      url: 'https://secureauth.ir/r?role=admin&website=panel.company.ir&name=فاطمه&family=کریمی'
    }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'تنظیم پارامترهای redirect',
      content: `// JavaScript - ساخت URL با پارامترهای مورد نیاز
const redirectUrl = new URL('https://secureauth.ir/incoming');
redirectUrl.searchParams.set('role', 'visitor');
redirectUrl.searchParams.set('website', 'example.com');
redirectUrl.searchParams.set('name', 'علی‌رضا');
redirectUrl.searchParams.set('family', 'احمدی');

// انتقال کاربر
window.location.href = redirectUrl.toString();`
    },
    {
      step: 2,
      title: 'مدیریت خطاها',
      content: `// بررسی پارامترهای اجباری قبل از redirect
function redirectToAuth(userData) {
  if (!userData.role || !userData.website) {
    alert('اطلاعات کاربر ناکامل است');
    return;
  }
  
  // ساخت URL امن
  const url = new URL('https://secureauth.ir/incoming');
  Object.keys(userData).forEach(key => {
    if (userData[key]) {
      url.searchParams.set(key, userData[key]);
    }
  });
  
  window.location.href = url.toString();
}`
    },
    {
      step: 3,
      title: 'دریافت پاسخ از سیستم',
      content: `// پس از تکمیل فرآیند احراز هویت، کاربر به آدرس زیر منتقل می‌شود:
// https://yoursite.com/auth-callback?token=JWT_TOKEN&status=success

// نمونه مدیریت callback
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const status = urlParams.get('status');

if (status === 'success' && token) {
  // ذخیره token و ادامه فرآیند
  localStorage.setItem('authToken', token);
  // انتقال به داشبورد
} else {
  // مدیریت خطا
}`
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-persian bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-persian-xl font-bold mb-6">
            مستندات فنی
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              راهنمای جامع انتگرال
            </span>
          </h1>
          <p className="text-persian-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            راهنمای کامل پیاده‌سازی و استفاده از API های احراز هویت ایمن
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={activeTab === 'redirect' ? 'default' : 'outline'}
              onClick={() => setActiveTab('redirect')}
              className="text-persian-base"
            >
              قوانین Redirect
            </Button>
            <Button
              variant={activeTab === 'integration' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('integration')}
              className="text-persian-base"
            >
              راهنمای انتگرال
            </Button>
            <Button
              variant={activeTab === 'examples' ? 'default' : 'outline'}
              onClick={() => setActiveTab('examples')}
              className="text-persian-base"
            >
              نمونه کدها
            </Button>
          </div>
        </div>
      </section>

      {/* Redirect Rules Tab */}
      {activeTab === 'redirect' && (
        <section className="section-persian">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="card-persian mb-12">
                <CardHeader>
                  <CardTitle className="text-persian-xl flex items-center gap-3">
                    <AlertCircle className="text-primary" />
                    قوانین مهم Redirect
                  </CardTitle>
                  <CardDescription className="text-persian-lg">
                    برای انتقال کاربران از وب‌سایت شما به سیستم احراز هویت، باید از قوانین زیر پیروی کنید
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {redirectRules.map((rule, index) => (
                      <div key={index} className="p-6 bg-muted rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          {rule.required ? (
                            <div className="w-3 h-3 bg-destructive rounded-full" />
                          ) : (
                            <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                          )}
                          <h3 className="font-semibold text-foreground">{rule.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">{rule.description}</p>
                        <code className="text-xs bg-background px-2 py-1 rounded text-primary">
                          {rule.example}
                        </code>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 border border-border rounded-lg p-6">
                    <h3 className="text-persian-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="text-primary" size={20} />
                      آدرس‌های مجاز برای redirect
                    </h3>
                    <div className="space-y-2 text-persian-base">
                      <p><code className="bg-primary/10 px-2 py-1 rounded text-primary">https://secureauth.ir/incoming</code></p>
                      <p><code className="bg-primary/10 px-2 py-1 rounded text-primary">https://secureauth.ir/r</code> (نسخه کوتاه)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sample URLs */}
              <Card className="card-persian">
                <CardHeader>
                  <CardTitle className="text-persian-lg">نمونه URL های صحیح</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sampleUrls.map((sample, index) => (
                    <div key={index} className="bg-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-foreground">{sample.title}</h4>
                      <div className="bg-background p-3 rounded border">
                        <code className="text-sm text-primary break-all">{sample.url}</code>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Integration Tab */}
      {activeTab === 'integration' && (
        <section className="section-persian">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {integrationSteps.map((step, index) => (
                <Card key={index} className="card-persian">
                  <CardHeader>
                    <CardTitle className="text-persian-lg flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>{step.content}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <section className="section-persian">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="card-persian">
                <CardHeader>
                  <CardTitle className="text-persian-lg">نمونه کدهای کامل</CardTitle>
                  <CardDescription>
                    نمونه‌های آماده برای زبان‌های مختلف برنامه‌نویسی
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* JavaScript Example */}
                  <div>
                    <h3 className="text-persian-lg font-semibold mb-4">JavaScript / TypeScript</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>{`// کلاس مدیریت احراز هویت
class SecureAuthManager {
  constructor(baseUrl = 'https://secureauth.ir') {
    this.baseUrl = baseUrl;
  }

  // انتقال کاربر برای احراز هویت
  redirectToAuth(userData) {
    // اعتبارسنجی پارامترهای اجباری
    if (!userData.role || !userData.website) {
      throw new Error('پارامترهای role و website اجباری هستند');
    }

    // ساخت URL
    const url = new URL(\`\${this.baseUrl}/incoming\`);
    
    // افزودن پارامترها
    Object.entries(userData).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, String(value));
    });

    // انتقال کاربر
    window.location.href = url.toString();
  }

  // مدیریت بازگشت از سیستم احراز هویت
  handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const status = params.get('status');

    if (status === 'success' && token) {
      // ذخیره token
      localStorage.setItem('authToken', token);
      return { success: true, token };
    }

    return { success: false, error: 'احراز هویت ناموفق' };
  }
}

// استفاده
const authManager = new SecureAuthManager();

// انتقال کاربر
authManager.redirectToAuth({
  role: 'visitor',
  website: 'example.com',
  name: 'علی‌رضا',
  family: 'احمدی'
});`}</code>
                      </pre>
                    </div>
                  </div>

                  {/* PHP Example */}
                  <div>
                    <h3 className="text-persian-lg font-semibold mb-4">PHP</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>{`<?php
class SecureAuthManager {
    private $baseUrl;
    
    public function __construct($baseUrl = 'https://secureauth.ir') {
        $this->baseUrl = $baseUrl;
    }
    
    // انتقال کاربر برای احراز هویت
    public function redirectToAuth($userData) {
        // اعتبارسنجی
        if (empty($userData['role']) || empty($userData['website'])) {
            throw new Exception('پارامترهای role و website اجباری هستند');
        }
        
        // ساخت URL
        $url = $this->baseUrl . '/incoming?' . http_build_query($userData);
        
        // انتقال کاربر
        header("Location: $url");
        exit;
    }
}

// استفاده
$authManager = new SecureAuthManager();

$authManager->redirectToAuth([
    'role' => 'visitor',
    'website' => 'example.com',
    'name' => 'علی‌رضا',
    'family' => 'احمدی'
]);
?>`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-persian bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-persian-xl font-bold mb-6">
            آماده شروع هستید؟
          </h2>
          <p className="text-persian-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            با راهنمای کامل، پیاده‌سازی سیستم احراز هویت را در کمتر از ۱۰ دقیقه شروع کنید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/incoming?role=visitor&website=example.com&name=تست&family=کاربر">
              <Button className="btn-persian-primary text-persian-base px-8 py-6">
                تست redirect
              </Button>
            </Link>
            <Link to="/auth?type=signup">
              <Button className="btn-persian-outline text-persian-base px-8 py-6">
                دریافت API Key
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Docs;