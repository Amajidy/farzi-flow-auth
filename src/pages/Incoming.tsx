import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, User, Globe, Shield, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RedirectData {
  role?: string;
  website?: string;
  name?: string;
  family?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  data: RedirectData;
}

const Incoming = () => {
  const [searchParams] = useSearchParams();
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateRedirectParams = (): ValidationResult => {
    const role = searchParams.get('role');
    const website = searchParams.get('website');
    const name = searchParams.get('name');
    const family = searchParams.get('family');
    
    const errors: string[] = [];
    
    // Required parameter validation
    if (!role) {
      errors.push('پارامتر role (نقش کاربر) الزامی است');
    } else {
      const validRoles = ['visitor', 'user', 'admin', 'moderator'];
      if (!validRoles.includes(role.toLowerCase())) {
        errors.push(`نقش "${role}" معتبر نیست. نقش‌های مجاز: ${validRoles.join(', ')}`);
      }
    }
    
    if (!website) {
      errors.push('پارامتر website (وب‌سایت مبدا) الزامی است');
    } else {
      // Normalize website (remove protocol, convert to lowercase)
      const normalizedWebsite = website.replace(/^https?:\/\//, '').toLowerCase();
      
      // Basic domain validation
      if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(normalizedWebsite) && 
          !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(normalizedWebsite)) {
        errors.push(`فرمت وب‌سایت "${website}" معتبر نیست`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      data: {
        role: role || undefined,
        website: website || undefined,
        name: name || undefined,
        family: family || undefined
      }
    };
  };

  const logRedirectAttempt = (data: RedirectData, isValid: boolean) => {
    // In a real implementation, this would be sent to server
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...data,
      isValid,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Store in localStorage for demo purposes
    const existingLogs = JSON.parse(localStorage.getItem('redirectLogs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('redirectLogs', JSON.stringify(existingLogs.slice(-100))); // Keep last 100 logs
  };

  useEffect(() => {
    const result = validateRedirectParams();
    setValidationResult(result);
    logRedirectAttempt(result.data, result.isValid);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-persian-lg text-muted-foreground">در حال بررسی اطلاعات...</p>
        </div>
      </div>
    );
  }

  if (!validationResult) {
    return null;
  }

  // Error page for invalid parameters
  if (!validationResult.isValid) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="card-persian">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="text-destructive" size={40} />
                </div>
                <CardTitle className="text-persian-xl text-destructive">
                  خطا در پارامترهای ورودی
                </CardTitle>
                <CardDescription className="text-persian-lg">
                  اطلاعات ارسال شده معتبر نیست
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                  <h3 className="text-persian-lg font-semibold text-destructive mb-4">
                    خطاهای موجود:
                  </h3>
                  <ul className="space-y-2">
                    {validationResult.errors.map((error, index) => (
                      <li key={index} className="flex items-start gap-3 text-persian-base">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-persian-lg font-semibold mb-4">
                    نحوه صحیح استفاده:
                  </h3>
                  <div className="space-y-3 text-persian-base text-muted-foreground">
                    <p>• پارامتر <code className="bg-background px-2 py-1 rounded text-primary">role</code> باید یکی از مقادیر visitor, user, admin, moderator باشد</p>
                    <p>• پارامتر <code className="bg-background px-2 py-1 rounded text-primary">website</code> باید آدرس معتبر دامنه باشد (مثل example.com)</p>
                    <p>• پارامترهای <code className="bg-background px-2 py-1 rounded text-primary">name</code> و <code className="bg-background px-2 py-1 rounded text-primary">family</code> اختیاری هستند</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/docs">
                    <Button className="btn-persian-primary text-persian-base">
                      مطالعه مستندات
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="btn-persian-outline text-persian-base">
                      بازگشت به صفحه اصلی
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Success page for valid parameters
  const { data } = validationResult;
  const fullName = data.name && data.family ? `${data.name} ${data.family}` : data.name || 'کاربر گرامی';

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-primary" size={40} />
            </div>
            <h1 className="text-persian-xl font-bold mb-4">
              خوش آمدید {fullName}
            </h1>
            <p className="text-persian-lg text-muted-foreground">
              اطلاعات شما با موفقیت دریافت و تایید شد
            </p>
          </div>

          {/* Received Parameters */}
          <Card className="card-persian mb-12">
            <CardHeader>
              <CardTitle className="text-persian-lg flex items-center gap-3">
                <Shield className="text-primary" />
                اطلاعات دریافت شده
              </CardTitle>
              <CardDescription>
                پارامترهای ارسال شده از وب‌سایت مبدا
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">نقش کاربر</p>
                      <p className="font-semibold text-foreground">{data.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Globe size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">وب‌سایت مبدا</p>
                      <p className="font-semibold text-foreground">{data.website}</p>
                    </div>
                  </div>
                </div>

                {(data.name || data.family) && (
                  <div className="space-y-4">
                    {data.name && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                          <User size={16} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">نام</p>
                          <p className="font-semibold text-foreground">{data.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {data.family && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                          <User size={16} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">نام خانوادگی</p>
                          <p className="font-semibold text-foreground">{data.family}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="card-persian">
            <CardHeader>
              <CardTitle className="text-persian-lg">
                مراحل بعدی
              </CardTitle>
              <CardDescription>
                برای تکمیل فرآیند احراز هویت، مراحل زیر را دنبال کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">۱</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">تایید هویت</h3>
                  <p className="text-sm text-muted-foreground">
                    فرآیند تایید هویت را تکمیل کنید
                  </p>
                </div>

                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">۲</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">دریافت توکن</h3>
                  <p className="text-sm text-muted-foreground">
                    توکن احراز هویت دریافت خواهید کرد
                  </p>
                </div>

                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">۳</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">بازگشت به سایت</h3>
                  <p className="text-sm text-muted-foreground">
                    به وب‌سایت اصلی منتقل خواهید شد
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link to="/auth?type=login">
                  <Button className="btn-persian-primary text-persian-base flex items-center gap-2">
                    ادامه فرآیند احراز هویت
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button className="btn-persian-outline text-persian-base">
                    مطالعه مستندات
                  </Button>
                </Link>
              </div>

              {/* Sample Callback URL */}
              <div className="bg-muted rounded-lg p-6 mt-8">
                <h3 className="text-persian-lg font-semibold mb-4">
                  نمونه آدرس بازگشت
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  پس از تکمیل فرآیند، کاربر به آدرس زیر منتقل خواهد شد:
                </p>
                <div className="bg-background p-3 rounded border">
                  <code className="text-sm text-primary break-all">
                    https://{data.website}/auth-callback?token=JWT_TOKEN&status=success&user={fullName}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Incoming;